import React, { useState } from 'react';
import './App.css';
import { ReactComponent as AshikaIcon } from './img/animal_ashika_svg.svg';
import { ReactComponent as SharkIcon } from './img/fish_shark_svg.svg';
import styled from '@emotion/styled/macro';

const Container = styled.div``;
const GameInfo = styled.div`
  position: relative;
  color: white;
  padding:10px;
  font-size: 100%;
  font-weight:bold;
`;
const Jiugongge = styled.div`
  position: relative;
`;
const JiugonggeItem = styled.button`
  position: relative;
  padding: 0;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  border: none;
`;
const Ashika = styled(AshikaIcon)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Shark = styled(SharkIcon)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const ResetButton = styled.button`
  border: 2px solid blue;
  color: #3A006F;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  font-weight:bold;
  background-color: white;
  border-radius: 10%;
  padding: 25px 16px;
`;

function App() {
  const GetNewArray = (length) => new Array(length).fill(null);
  const [boardList, setBoardList] = useState(GetNewArray(9));
  const [player, setPlayer] = useState("1P");
  const [pointer1, setPointer1] = useState(0);
  const [pointer2, setPointer2] = useState(3);
  const [turnsList, setTurnsList] = useState(GetNewArray(6));
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let ptr1 = pointer1,
      ptr2 = pointer2,
      turns = turnsList;

  const CheckWin = (board) => {
    const player1Index = board
      .map((player, index) => player === "1P" ? index : -1)
      .filter(index => index !== -1);

    const player2Index = board
      .map((player, index) => player === "2P" ? index : -1)
      .filter(index => index !== -1);

    const player1Wins = winCondition.some(condition =>
      condition.every(index => player1Index.includes(index))
    );

    const player2Wins = winCondition.some(condition =>
      condition.every(index => player2Index.includes(index))
    );

    return player1Wins || player2Wins;
  };

  const SetTuns = (position) => {
    if (player === "1P" && ptr1 === 3){
      ptr1 = 0;
      turns[ptr1] = position;
    }
    else if (player === "1P" && ptr1 < 3){
      turns[ptr1] = position;
      ptr1 ++;
    }

    if (player === "2P" && ptr2 === 6){
      ptr2 = 3;
      turns[ptr2] = position;
    }
    else if (player === "2P" && ptr2 < 6){
      turns[ptr2] = position;
      ptr2 ++;
    }

    setTurnsList(turns);
  };

  const SetBoard = () => {
    let board = GetNewArray(9);

    turns.forEach((position, index) => {
      if (position === null) return;
      else if(index < 3) board[position] = "1P";
      else  board[position] = "2P";
    });

    setBoardList(board);

    return board;
  };

  const handleClick = (position) => {
    if (boardList[position] !== null) return;

    SetTuns(position);

    setPointer1(ptr1);
    setPointer2(ptr2);
    
    const board = SetBoard(position);

    if (CheckWin(board)) {
      setTimeout(() => {
        alert(`Winner: ${player}`);
        Reset();
      }, 200);
    }
    else {
      setPlayer(player === "1P" ? "2P" : "1P");
    }
  };

  const Reset = () => {
    setBoardList(GetNewArray(9));
    setPlayer("1P");
    setPointer1(0);
    setPointer2(3);
    setTurnsList(GetNewArray(6));
  };

  return (
    <Container className="grid-container">
      <GameInfo>
        回合: {player}
      </GameInfo>
      <Jiugongge className="grid-container">
        {Array.from({ length: 9 }, (_, index) => (
          <JiugonggeItem key={index} className="grid-item" onClick={() => handleClick(index)} >
            {boardList[index] && (boardList[index] === "1P" ? <Ashika /> : <Shark />)}
          </JiugonggeItem>
        ))}
          <ResetButton onClick={() => {Reset()}}>
            Reset
          </ResetButton>
      </Jiugongge>
    </Container>
  );
}

export default App;

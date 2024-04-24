import React, { useState } from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState('Next player: X');

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const winner = calculateWinner(newBoard);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (newBoard.every(Boolean)) {
      setStatus('Draw');
    } else {
      setStatus(`Next player: ${isXNext ? 'O' : 'X'}`);
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus('Next player: X');
  };

  return (
    <VStack spacing={4}>
      <Box>
        {board.map((value, index) => (
          <Button key={index} onClick={() => handleClick(index)}>{value}</Button>
        ))}
      </Box>
      <Text>{status}</Text>
      <Button onClick={handleReset}>Reset Game</Button>
    </VStack>
  );
};

export default Index;
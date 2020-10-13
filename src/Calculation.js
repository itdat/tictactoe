const calculateWinner = (squares, winSteps, index, player) => {
  const x = index % Math.sqrt(squares.length),
    y = Math.floor(index / Math.sqrt(squares.length)),
    size = Math.sqrt(squares.length);

  // Check col
  let j = y;
  let count = 0;
  while (j >= 0 && squares[j * size + x] === player) {
    ++count;
    --j;
  }
  j = y + 1;
  while (j < size && squares[j * size + x] === player) {
    ++count;
    ++j;
  }
  if (count === winSteps) return true;

  // Check row
  let i = x;
  count = 0;
  while (i >= 0 && squares[y * size + i] === player) {
    ++count;
    --i;
  }
  i = x + 1;
  while (i < size && squares[y * size + i] === player) {
    ++count;
    ++i;
  }
  if (count === winSteps) return true;

  // Check diag
  i = x;
  j = y;
  count = 0;
  while (i >= 0 && j >= 0 && squares[j * size + i] === player) {
    ++count;
    --i;
    --j;
  }
  i = x + 1;
  j = y + 1;
  while (i < size && j < size && squares[j * size + i] === player) {
    ++count;
    ++i;
    ++j;
  }
  if (count === winSteps) return true;

  // Check anti-diag
  i = x;
  j = y;
  count = 0;
  while (i >= 0 && j < 0 && squares[j * size + i] === player) {
    ++count;
    --i;
    ++j;
  }
  i = x + 1;
  j = y - 1;
  while (i < size && j >= 0 && squares[j * size + i] === player) {
    ++count;
    ++i;
    --j;
  }
  if (count === winSteps) return true;

  return false;
};

export { calculateWinner };

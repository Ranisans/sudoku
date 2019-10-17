module.exports = solveSudoku;

function solveSudoku(matrix) {
  const emptyPositions = saveEmptyPositions(matrix);

  fillMatrix(matrix, emptyPositions);
  return matrix;
}

const saveEmptyPositions = matrix => {
  const emptyPositions = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 0) emptyPositions.push([i, j]);
    }
  }

  return emptyPositions;
};

const checkRow = (matrix, row, number) => {
  return !matrix[row].includes(number);
};

const checkColumn = (matrix, column, number) => {
  const transArray = matrix[0].map((col, i) => matrix.map(row => row[i]));
  return !transArray[column].includes(number);
};

const check3x3Square = (matrix, row, column, number) => {
  let rowCorner = 0,
    columnCorner = 0,
    squareSize = 3;

  while (column >= columnCorner + squareSize) {
    columnCorner += squareSize;
  }

  while (row >= rowCorner + squareSize) {
    rowCorner += squareSize;
  }

  for (let i = rowCorner; i < rowCorner + squareSize; i++) {
    for (let j = columnCorner; j < columnCorner + squareSize; j++) {
      if (matrix[i][j] === number) return false;
    }
  }

  return true;
};

const checkValue = (matrix, row, column, number) => {
  if (
    checkRow(matrix, row, number) &&
    checkColumn(matrix, column, number) &&
    check3x3Square(matrix, row, column, number)
  )
    return true;
  return false;
};

const fillMatrix = (matrix, emptyPositions) => {
  const limit = 9;
  let i, row, column, value, found;

  for (i = 0; i < emptyPositions.length; ) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];

    value = matrix[row][column] + 1;
    found = false;

    while (!found && value <= limit) {
      if (checkValue(matrix, row, column, value)) {
        found = true;
        matrix[row][column] = value;
        i++;
      } else {
        value++;
      }
    }
    if (!found) {
      matrix[row][column] = 0;
      i--;
    }
  }
};

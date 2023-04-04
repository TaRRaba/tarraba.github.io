const data = `
1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--
--5-3--819-285--6-6----4-5---74-283-34976---5--83--49-15--87--2-9----6---26-495-3
29-5----77-----4----4738-129-2--3-648---5--7-5---672--3-9--4--5----8-7---87--51-9
-8--2-----4-5--32--2-3-9-466---9---4---64-5-1134-5-7--36---4--24-723-6-----7--45-
6-873----2-----46-----6482--8---57-19--618--4-31----8-86-2---39-5----1--1--4562--
---6891--8------2915------84-3----5-2----5----9-24-8-1-847--91-5------6--6-41----
-3-5--8-45-42---1---8--9---79-8-61-3-----54---5------78-----7-2---7-46--61-3--5--
-96-4---11---6---45-481-39---795--43-3--8----4-5-23-18-1-63--59-59-7-83---359---7
----754----------8-8-19----3----1-6--------34----6817-2-4---6-39------2-53-2-----
3---------5-7-3--8----28-7-7------43-----------39-41-54--3--8--1---4----968---2--
3-26-9--55--73----------9-----94----------1-9----57-6---85----6--------3-19-82-4-
-2-5----48-5--------48-9-2------5-73-9-----6-25-9------3-6-18--------4-71----4-9-
--7--8------2---6-65--79----7----3-5-83---67-2-1----8----71--38-2---5------4--2--
----------2-65-------18--4--9----6-4-3---57-------------------73------9----------
---------------------------------------------------------------------------------
`;

// Разбить содержимое файла построчно и отфильтровать все пустые строки.
const puzzles = data.split('\n').filter((line) => line !== '');

let puzzleNumber;
let baseBoard = [];
let PrevNumber = 0;

// Использовать функцию solve из файла sudoku.js для решения судоку.
// const solvedPuzzle = sudoku.solve(puzzles[puzzleNumber]);

const buttonEasy = document.querySelector('#easy');
const buttonMedium = document.querySelector('#medium');
const buttonHard = document.querySelector('#hard');
const buttonSolve = document.querySelector('#solve');
const solved = document.querySelector('.solved');

function genNumber() {
  puzzleNumber = Math.floor(Math.random() * 5);
  while (PrevNumber === puzzleNumber) {
    puzzleNumber = Math.floor(Math.random() * 5);
  }
  PrevNumber = puzzleNumber;
  return puzzleNumber;
}

buttonEasy.addEventListener('click', (el) => {
  baseBoard = puzzles[genNumber()].split('');
  showBoard(baseBoard);
  solved.style.display = 'none';
});

buttonMedium.addEventListener('click', (el) => {
  baseBoard = puzzles[genNumber() + 5].split('');
  showBoard(baseBoard);
  solved.style.display = 'none';
});

buttonHard.addEventListener('click', (el) => {
  baseBoard = puzzles[genNumber() + 10].split('');
  showBoard(baseBoard);
  solved.style.display = 'none';
});

buttonSolve.addEventListener('click', (el) => {
  const solvedArr = solve(baseBoard.join(''));
  const solvedPuzzle = solve(baseBoard.join('')).flat(3);
  if (isSolved(solvedArr)) {
    showBoard(solvedPuzzle);
    solved.style.display = 'flex';
  }
});

function showBoard(board) {
  const baseCells = document.querySelectorAll('.box');
  for (let i = 0; i < baseCells.length; i++) {
    baseCells[i].innerText = board[i];
  }
}

function solve(arg) {
  // Создаем массив из входной строки и делаем массив из массивов
  const arr = arg.split('');
  const board = [];
  while (arr.length) board.push(arr.splice(0, 9));

  // Проверка полученных данных на валидность
  for (let column = 0; column < board.length; column++) {
    for (let row = 0; row < board.length; row++) {
      if (board[column][row] !== '-') {
        if (!validate(board[column][row], [column, row], board)) return 'Неправильный судоку';
      }
    }
  }

  // Решатель судоку
  function solveSudoku() {
    const position = findEmpty(board);

    if (position === null) {
      return true;
    }
    for (let i = 1; i < 9 + 1; i++) {
      const num = i.toString();
      const isValid = validate(num, position, board);
      if (isValid) {
        const [x, y] = position;
        board[x][y] = num;

        if (solveSudoku()) {
          return true;
        }

        board[x][y] = '-';
      }
    }
    return false;
  }

  solveSudoku();
  return board;
}

// Находит пустые клетки
function findEmpty(board) {
  for (let row = 0; row < 9; row++) {
    for (let clm = 0; clm < 9; clm++) {
      if (board[row][clm] === '-') {
        return [row, clm];
      }
    }
  }
  return null;
}

// Валидатор правильного выбора числа для конкретной позиции
function validate(num, pos, board) {
  const [row, clm] = pos;

  // Проверяет строки
  for (let i = 0; i < 9; i++) {
    if (board[i][clm] === num && i !== row) {
      return false;
    }
  }
  // Проверяет столбцы
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && i !== clm) {
      return false;
    }
  }
  // Проверяет блоки 3х3
  const boxR = Math.floor(row / 3) * 3;
  const boxC = Math.floor(clm / 3) * 3;

  for (let i = boxR; i < boxR + 3; i++) {
    for (let j = boxC; j < boxC + 3; j++) {
      if (board[i][j] === num && i !== row && j !== clm) {
        return false;
      }
    }
  }
  return true;
}

// Проверка на полное решение таблицы
function isSolved(board) {
  if (!board.length === 9) return false;
  for (let column = 0; column < board.length; column++) {
    for (let row = 0; row < board.length; row++) {
      if (board[column][row] === '-') return false;
      if (!validate(board[column][row], [column, row], board)) return false;
    }
  }
  return true;
}

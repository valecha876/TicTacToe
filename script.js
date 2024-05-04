document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const turnText = document.getElementById('turnText');
  const playerTurnBox = document.getElementById('playerTurnBox'); // Select the playerTurnBox element
  const winnerModal = document.getElementById('winnerModal');
  const winnerText = document.getElementById('winnerText');
  const restartBtn = document.getElementById('restartBtn');
  const restartBtnBottom = document.getElementById('restartBtnBottom');
  let currentPlayer = 'X';
  let boardState = ['', '', '', '', '', '', '', '', ''];

  // Function to update turn text
  const updateTurnText = () => {
    turnText.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn`;
  };

  // Function to update player turn box
  const updatePlayerTurnBox = () => {
    playerTurnBox.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn`;
  };

  // Function to handle cell clicks
  const handleCellClick = (e, index) => {
    if (boardState[index] === '') {
      boardState[index] = currentPlayer;
      e.target.innerText = currentPlayer;
      if (checkWinner()) {
        winnerText.textContent = `${currentPlayer} wins!`;
        winnerModal.style.display = 'block';
      } else if (boardState.every(cell => cell !== '')) {
        winnerText.textContent = "It's a draw!";
        winnerModal.style.display = 'block';
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnText();
        updatePlayerTurnBox(); // Update player turn box after player's turn
      }
    }
  };

  // Function to check if there's a winner
  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winningCombos.some(combo => {
      return combo.every(index => boardState[index] === currentPlayer);
    });
  };

  // Function to reset the game
  const resetGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
      cell.innerText = '';
    });
    winnerModal.style.display = 'none';
    updateTurnText();
    updatePlayerTurnBox(); // Update player turn box after resetting the game
  };

  // Generate game board cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', (e) => handleCellClick(e, i));
    board.appendChild(cell);
  }

  // Event listeners for restart buttons
  restartBtn.addEventListener('click', resetGame);
  restartBtnBottom.addEventListener('click', resetGame);

  // Initial update of turn text and player turn box
  updateTurnText();
  updatePlayerTurnBox();
});

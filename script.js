const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let currentPlayer = 'X';  // Player 1 starts
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Represents the game state (empty cells)

// Check for winner or draw
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];  // Return the winner ('X' or 'O')
        }
    }

    // Check for draw (all cells filled and no winner)
    return gameBoard.includes('') ? null : 'Draw';  // Return 'Draw' if no winner and board is full
};

// Handle cell click
const handleCellClick = (e) => {
    const cellIndex = e.target.getAttribute('data-cell');

    // If the cell is already occupied, show an alert and return
    if (gameBoard[cellIndex]) {
        alert('This cell has already been taken. Please choose another one.');
        return;  // Exit the function if the cell is already taken
    }

    // Add Font Awesome bird icons based on the current player
    if (currentPlayer === 'X') {
        e.target.innerHTML = `<i class="fas fa-crow"></i>`;  // Crow icon for Player X
    } else {
        e.target.innerHTML = `<i class="fas fa-dove"></i>`;  // Dove icon for Player O
    }

    gameBoard[cellIndex] = currentPlayer;  // Update the game board

    const winner = checkWinner();
    if (winner) {
        if (winner === 'Draw') {
            statusDisplay.textContent = "It's a Draw!";  // Display draw message
        } else {
            statusDisplay.textContent = `${winner} Wins!`;  // Display winner message
        }
        return;  // Stop the game after a win or draw
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};

// Reset the game
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusDisplay.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.innerHTML = '';  // Clear the cells
    });
};

// Attach event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

statusDisplay.textContent = "Player X's Turn";


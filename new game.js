// Define the puzzle grid size (e.g., 3x3)
const gridSize = 3;
const tileCount = gridSize * gridSize;
// Function to create puzzle pieces and initialize the game
function createPuzzle() {
    const container = document.getElementById('puzzle-container');
    container.innerHTML = '';

    for (let i = 1; i < tileCount; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.backgroundImage = `url('image.jpg')`; // Set your image URL here
        piece.style.backgroundPosition = `${(i % gridSize) * -100}px ${Math.floor(i / gridSize) * -100}px`;
        piece.style.gridColumn = `${(i - 1) % gridSize + 1}`;
        piece.style.gridRow = `${Math.floor((i - 1) / gridSize) + 1}`;
        piece.dataset.number = i;

        piece.addEventListener('click', () => {
            moveTile(piece);
            checkForWin();
        });

        container.appendChild(piece);
    }
}

// Function to shuffle the puzzle pieces
function shuffleTiles() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    pieces.forEach(piece => {
        const randomPosition = Math.floor(Math.random() * tileCount) + 1;
        moveTile(piece, randomPosition);
    });
}

// Function to move a puzzle piece
function moveTile(tile, newPosition) {
    const currentPos = parseInt(tile.dataset.number);
    if (!newPosition) {
        do {
            newPosition = Math.floor(Math.random() * tileCount) + 1;
        } while (newPosition === currentPos);
    }

    const targetTile = document.querySelector(`[data-number="${newPosition}"]`);
    tile.dataset.number = newPosition;
    targetTile.dataset.number = currentPos;

    tile.style.gridColumn = `${(newPosition - 1) % gridSize + 1}`;
    tile.style.gridRow = `${Math.floor((newPosition - 1) / gridSize) + 1}`;
}

// Function to check for a win
function checkForWin() {
    const pieces = [...document.querySelectorAll('.puzzle-piece')];
    const sortedPieces = pieces.map(piece => parseInt(piece.dataset.number));
    sortedPieces.push(tileCount);

    if (JSON.stringify(sortedPieces) === JSON.stringify([...Array(tileCount).keys()].map(i => i + 1))) {
        alert('Congratulations! You solved the puzzle!');
    }
}

// Initialize the game
createPuzzle();
shuffleTiles();








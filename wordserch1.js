const words = ["FOX", "BIRD", "CRICKETS", "BEAR", "POMERNIAN", "COBRA", "OWL", "SQUIRREL", "SNAKE"];
const gridSize = 10;
let timerInterval;
let seconds = 0;

const timerElement = document.getElementById("timer");
const gridContainer = document.getElementById("word-grid");

const updateTimer = () => {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    timerElement.textContent = `Time: ${mins}:${secs}`;
};

timerInterval = setInterval(updateTimer, 1000);

const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Place words in the grid
const placeWord = (word) => {
    let placed = false;
    while (!placed) {
        const direction = ["horizontal", "vertical", "diagonal"][Math.floor(Math.random() * 3)];
        const startRow = Math.floor(Math.random() * gridSize);
        const startCol = Math.floor(Math.random() * gridSize);
        const wordLength = word.length;

        if (direction === "horizontal" && startCol + wordLength <= gridSize) {
            if (word.split("").every((letter, index) => grid[startRow][startCol + index] === "")) {
                word.split("").forEach((letter, index) => grid[startRow][startCol + index] = letter);
                placed = true;
            }
        } else if (direction === "vertical" && startRow + wordLength <= gridSize) {
            if (word.split("").every((letter, index) => grid[startRow + index][startCol] === "")) {
                word.split("").forEach((letter, index) => grid[startRow + index][startCol] = letter);
                placed = true;
            }
        }
    }
};

words.forEach(word => placeWord(word));

// Fill empty cells with random letters
grid.forEach((row, rowIndex) => row.forEach((cell, colIndex) => {
    if (!cell) {
        grid[rowIndex][colIndex] = letters[Math.floor(Math.random() * letters.length)];
    }
}));

// Generate grid UI
grid.forEach((row, rowIndex) => row.forEach((cell, colIndex) => {
    const cellDiv = document.createElement("div");
    cellDiv.textContent = cell;
    cellDiv.dataset.row = rowIndex;
    cellDiv.dataset.col = colIndex;
    gridContainer.appendChild(cellDiv);
}));

// Drag selection variables
let isDragging = false;
let selectedCells = [];
const foundWords = new Set();

const startSelection = (event) => {
    if (event.target.textContent && !event.target.classList.contains("highlight")) {
        isDragging = true;
        selectedCells.push(event.target);
        event.target.classList.add("highlight");
    }
};

const wordListElement = document.getElementById("word-list");

const animalSounds = {
    "FOX": new Audio("animalsound/fox.mp3"),
    "BIRD": new Audio("animalsound/bird.mp3"),
    "CRICKETS": new Audio("animalsound/crickets.mp3"),
    "BEAR": new Audio("animalsound/bear.mp3"),
    "POMERNIAN": new Audio("animalsound/pompom.mp3"),
    "COBRA": new Audio("animalsound/cobra.mp3"),
    "OWL": new Audio("animalsound/owl.mp3"),
    "SQUIRREL": new Audio("animalsound/squirrel.mp3"),
    "SNAKE": new Audio("animalsound/snake.mp3")
};

const markWordAsFound = (word) => {
    const wordElements = wordListElement.querySelectorAll(`span[data-word="${word}"]`);
    wordElements.forEach(element => element.classList.add("found"));

    Object.values(animalSounds).forEach(sound => sound.pause());
    if (animalSounds[word]) {
        animalSounds[word].currentTime = 0;
        animalSounds[word].play();
    }
};

const continueSelection = (event) => {
    if (isDragging && event.target.textContent && !selectedCells.includes(event.target) && !event.target.classList.contains("highlight")) {
        selectedCells.push(event.target);
        event.target.classList.add("highlight");
    }
};

const stopSelection = () => {
    if (isDragging) {
        isDragging = false;
        const selectedWord = selectedCells.map(cell => cell.textContent).join("");

        if (words.includes(selectedWord) && !foundWords.has(selectedWord)) {
            foundWords.add(selectedWord);
            markWordAsFound(selectedWord);

            selectedCells.forEach(cell => {
                if (cell.classList.contains("highlight-new")) {
                    cell.classList.remove("highlight-new");
                }
            });

            if (foundWords.size === words.length) {
                clearInterval(timerInterval);

                const timeTaken = seconds;
                let stars = '';

                if (timeTaken <= 60) {
                    stars = '⭐⭐⭐⭐⭐';
                } else if (timeTaken <= 120) {
                    stars = '⭐⭐⭐⭐';
                } else if (timeTaken <= 180) {
                    stars = '⭐⭐⭐';
                } else if (timeTaken <= 240) {
                    stars = '⭐⭐';
                } else {
                    stars = '⭐';
                }

                let message = `เก่งมากผ่านด่านแล้ว!<br>
ใช้เวลาไป: ${Math.floor(timeTaken / 60)}:${String(timeTaken % 60).padStart(2, '0')} นาที<br>
จำนวนดาว!: ${stars}`;

                const popup = document.createElement('div');
                popup.style.position = 'fixed';
                popup.style.top = '50%';
                popup.style.left = '50%';
                popup.style.transform = 'translate(-50%, -50%)';
                popup.style.padding = '20px';
                popup.style.backgroundColor = '#000000';
                popup.style.color = '#fff';
                popup.style.borderRadius = '10px';
                popup.style.textAlign = 'center';
                popup.style.zIndex = '1000';
                popup.innerHTML = `
    <p>${message}</p>
    <button onclick="window.location.href='WordSearch2.html'">Next Page</button>
`;
                document.body.appendChild(popup);
            }
        } else {
            selectedCells.forEach(cell => {
                if (!cell.classList.contains("found")) {
                    cell.classList.remove("highlight");
                }
            });
        }
        selectedCells = [];
    }
};

gridContainer.addEventListener("mousedown", startSelection);
gridContainer.addEventListener("mousemove", continueSelection);
document.addEventListener("mouseup", stopSelection);




////////////////////////////////////////////ตัวเทสpopup//////////////////////////////////////////////////////
// ฟังก์ชันสำหรับสร้าง Popup
const showPopup = (timeTaken, stars) => {
    let message = `เก่งมากผ่านด่านแล้ว!<br>
    ใช้เวลาไป: ${Math.floor(timeTaken / 60)}:${String(timeTaken % 60).padStart(2, '0')} นาที<br>
    จำนวนดาว!: ${stars}`;

    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#000000';
    popup.style.color = '#fff';
    popup.style.borderRadius = '10px';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '1000';
    popup.innerHTML = `
        <p>${message}</p>
        <button onclick="window.location.href='WordSearch2.html'">Next Page</button>
        <button onclick="this.parentElement.remove()">Close</button>
    `;
    document.body.appendChild(popup);
};

// เพิ่มปุ่มทดสอบในหน้า
const testButton = document.createElement('button');
testButton.textContent = 'Test Popup';
testButton.style.position = 'fixed';
testButton.style.top = '10px';
testButton.style.right = '10px';
testButton.style.padding = '10px';
testButton.style.backgroundColor = '#28a745';
testButton.style.color = '#fff';
testButton.style.border = 'none';
testButton.style.borderRadius = '5px';
testButton.style.cursor = 'pointer';
document.body.appendChild(testButton);

// เมื่อคลิกปุ่มทดสอบ ให้เรียกฟังก์ชัน showPopup
testButton.addEventListener('click', () => {
    const timeTaken = 123; // เวลาในวินาที (ตัวอย่าง)
    let stars = '⭐⭐⭐'; // จำนวนดาว (ตัวอย่าง)
    showPopup(timeTaken, stars);
});

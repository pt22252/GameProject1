const words = ["WHALE", "DOLPHIN", "SHARK", "GOLDFISH", "WALRUS", "CRAB", "SEAL", "OCTOPUS", "SNAIL"];
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
    "WHALE": new Audio("animalsound/whale.mp3"),
    "DOLPHIN": new Audio("animalsound/dolphin.mp3"),
    "SHARK": new Audio("animalsound/shark.mp3"),
    "GOLDFISH": new Audio("animalsound/goldfish.mp3"),
    "WALRUS": new Audio("animalsound/walrus.mp3"),
    "CRAB": new Audio("animalsound/crab.mp3"),
    "SEAL": new Audio("animalsound/seal.mp3"),
    "OCTOPUS": new Audio("animalsound/octopus.mp3"),
    "SNAIL": new Audio("animalsound/snail.mp3")
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
                popup.style.fontSize = '20pt';
                popup.style.width = '400px';
                popup.style.height = '300px';
                popup.style.transform = 'translate(-50%, -50%)';
                popup.style.padding = '10px';
                popup.style.backgroundColor = '#886E58';
                popup.style.color = '#fff';
                popup.style.borderRadius = '10px';
                popup.style.display = 'flex'; // ใช้ flexbox
                popup.style.flexDirection = 'column'; // จัดเรียงเป็นแนวตั้ง
                popup.style.justifyContent = 'space-between'; // กระจายช่องว่างระหว่างข้อความและปุ่ม
                popup.style.alignItems = 'center'; // จัดตำแหน่งกลางในแนวนอน
                popup.style.textAlign = 'center';
                popup.style.zIndex = '1000';
                popup.style.opacity = '0.9'; // ความโปร่งใสของ popup

                popup.innerHTML = `
    <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center;">
        <p>${message}</p>
    </div>
    <div style="display: flex; gap: 10px;">
        <button style="padding: 10px 20px; font-size: 25px; border: none; border-radius: 5px; background-color: #fff; color: #962727; cursor: pointer; font-family: 'Mali', sans-serif;"
            onclick="window.location.href='WordSearch03ChapEnd.html'">ผจญภัยกันต่อ!!</button>
    </div>
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

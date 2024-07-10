let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    startStopButton.innerHTML = "Pause";
    running = true;
}

function pauseStopwatch() {
    clearInterval(tInterval);
    startStopButton.innerHTML = "Start";
    running = false;
}

function resetStopwatch() {
    clearInterval(tInterval);
    display.innerHTML = "00:00:00";
    startStopButton.innerHTML = "Start";
    lapsList.innerHTML = "";
    laps = [];
    running = false;
}

function lapStopwatch() {
    if (running) {
        const lapTime = display.innerHTML;
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);
    display.innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + ":" + (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

startStopButton.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
});

lapButton.addEventListener('click', lapStopwatch);
resetButton.addEventListener('click', resetStopwatch);

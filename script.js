let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isRunning = false;
let isBreak = false;
let workSessions = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const skipButton = document.getElementById('skip');
const workSessionsCount = document.getElementById('workSessionsCount');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            if (isBreak) {
                alert('Break is over! Time to get back to work.');
                resetTimer();
            } else {
                workSessions++;
                workSessionsCount.textContent = workSessions;
                if (workSessions % 4 === 0) {
                    alert('Time is up! Starting 15-minute long break.');
                    startBreak(true);
                } else {
                    alert('Time is up! Starting 5-minute break.');
                    startBreak(false);
                }
            }
        } else {
            timeLeft--;
            updateDisplay();
        }
    }, 1000);
}

function startBreak(isLongBreak) {
    isBreak = true;
    timeLeft = isLongBreak ? 900 : 300; // 15 minutes or 5 minutes in seconds
    updateDisplay();
    startTimer();
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isBreak = false;
    timeLeft = 1500;
    updateDisplay();
}

function skipTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 0;
    updateDisplay();
    if (isBreak) {
        alert('Break is over! Time to get back to work.');
        resetTimer();
    } else {
        workSessions++;
        workSessionsCount.textContent = workSessions;
        if (workSessions % 4 === 0) {
            alert('Time is up! Starting 15-minute long break.');
            startBreak(true);
        } else {
            alert('Time is up! Starting 5-minute break.');
            startBreak(false);
        }
    }
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
skipButton.addEventListener('click', skipTimer);

updateDisplay();
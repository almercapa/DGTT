const gameState = {
    mahoHP: 100,
    playerHP: 100,
    seconds: 5,
    intervals: 0,
    maxIntervals: 8,
    streak: 0,
    blackFlashActive: false
};

const UI = {
    mahoBar: document.getElementById("maho-fill"),
    playBar: document.getElementById("player-fill"),
    mahoBox: document.querySelector(".maho-wrapper"),
    playBox: document.querySelector(".player-wrapper"),
    timer: document.getElementById("timer-message"),
    result: document.querySelector(".result"),
    atkBtn: document.getElementById("attack"),
    rstBtn: document.getElementById("reset")
};

const damageMap = {
    "Easy": 5,
    "Medium": 10,
    "Hard": 15,
    "Very Hard": 20
}

function difficultyLookup(damageMap) {
    const keys = Object.keys(damageMap);
    const index = Math.floor(Math.random() * keys.length);
    return keys[index];
}

function checkBattle(hp1, hp2) {
    if (hp1 <= 0 && hp2 <= 0) {
        clearInterval(adapt);
        UI.timer.innerText = "";
        UI.result.style.color = "maroon";
        UI.result.innerText = "Mutual Destruction - Mahoraga Adapted First";
    } else if (hp1 <= 0) {
        clearInterval(adapt);
        UI.timer.innerText = "";
        UI.result.style.color = "maroon";
        UI.result.innerText = "You have been defeated";
    } else if (hp2 <= 0) {
        clearInterval(adapt);
        UI.timer.innerText = "";
        UI.result.style.color = "forestgreen";
        UI.result.innerText = "Mahoraga has been defeated";
    }
}

function startTimer() {
    adapt = setInterval(reduceHP, 1000);
}

function reduceHP() {
    gameState.seconds -= 1;
    UI.timer.innerText = `Adaptation in ${gameState.seconds} seconds | ${gameState.intervals}/8`;
    if (gameState.playerHP > 0 && gameState.seconds === 0) {
        UI.playBox.classList.remove("apply_shake")
        void UI.playBox.offsetWidth;
        UI.playBox.classList.add("apply_shake");
        gameState.playerHP -= 12.5;
        UI.playBar.style.width = `${gameState.playerHP}%`;
        gameState.seconds = 5;
        gameState.intervals += 1;
        gameState.blackFlashActive = false;
        gameState.streak = 0;
        UI.timer.innerText = `Adaptation in ${gameState.seconds} seconds | ${gameState.intervals}/8`;
    }
    checkBattle(gameState.playerHP, gameState.mahoHP);
}

UI.atkBtn.addEventListener("click", (e) => {
    if (gameState.mahoHP > 0 && gameState.playerHP > 0) {
        UI.mahoBox.classList.remove("apply_shake")
        void UI.mahoBox.offsetWidth;
        UI.mahoBox.classList.add("apply_shake");
        const diff = difficultyLookup(damageMap);
        if (diff == "Hard" || diff == "Very Hard") {
            gameState.streak += 1;
            if (gameState.streak >= 5) {
                gameState.blackFlashActive = true;
            }
        } else {
            gameState.streak = 0;
            gameState.blackFlashActive = false;
        }
        if (gameState.blackFlashActive == true) {
            gameState.mahoHP -= damageMap[diff] * 2.5;
        } else {
            gameState.mahoHP -= damageMap[diff];
        }
        UI.mahoBar.style.width = `${gameState.mahoHP}%`;
    }
    checkBattle(gameState.playerHP, gameState.mahoHP);
});

UI.rstBtn.addEventListener("click", (e) =>  {
    clearInterval(adapt);
    UI.result.innerText = "";
    gameState.mahoHP = 100;
    UI.mahoBar.style.width = `100%`;
    gameState.playerHP = 100;
    UI.playBar.style.width = `100%`;
    gameState.seconds = 5;
    gameState.intervals = 0;
    UI.timer.innerText = `Adaptation in ${gameState.seconds} seconds | ${gameState.intervals}/8`;
    startTimer();
});

UI.timer.innerText = `Adaptation in ${gameState.seconds} seconds | ${gameState.intervals}/8`;
startTimer();
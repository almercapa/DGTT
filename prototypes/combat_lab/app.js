const atk = document.getElementById("attack");
const rst = document.getElementById("reset");
let maho_hp = 100;
let maho_bar = document.getElementById("maho-fill");
let play_hp = 100;
let play_bar = document.getElementById("player-fill");
let rt = document.querySelector(".result");
let timer = document.getElementById("timer-message");
let sec = 5;
let adapt;

function startTimer() {
    adapt = setInterval(reduceHP, 1000);
}

function reduceHP() {
    sec -= 1;
    timer.innerText = "Adaptation in " + sec + " seconds";
    if (play_hp > 0 && sec === 0) {
        play_hp -= 12.5;
        play_bar.style.width = `${play_hp}%`;
        sec = 5;
        timer.innerText = "Adaptation in "  + sec + " seconds";
    }
    if (play_hp <= 0 && maho_hp <= 0) {
        clearInterval(adapt);
        timer.innerText = "";
        rt.style.color = "maroon";
        rt.innerText = "Mutual Destruction - Mahoraga Adapted First";
    } else if (play_hp <= 0) {
        clearInterval(adapt);
        timer.innerText = "";
        rt.style.color = "maroon";
        rt.innerText = "You have been defeated";
    } else if (maho_hp <= 0) {
        clearInterval(adapt);
        timer.innerText = "";
        rt.style.color = "forestgreen";
        rt.innerText = "Mahoraga has been defeated";
    }
}

atk.addEventListener("click", (e) => {
    if (maho_hp > 0 && play_hp > 0) {
        maho_hp -= 10;
        maho_bar.style.width = `${maho_hp}%`;
    }
    if (play_hp <= 0 && maho_hp <= 0) {
        clearInterval(adapt);
        timer.innerText = "";
        rt.style.color = "maroon";
        rt.innerText = "Mutual Destruction - Mahoraga Adapted First";
    } else if (play_hp <= 0) {
        clearInterval(adapt);
        timer.innerText = "";
        rt.style.color = "maroon";
        rt.innerText = "You have been defeated";
    } else if (maho_hp <= 0) {
        clearInterval(adapt);
        timer.innerText = "";
        rt.style.color = "forestgreen";
        rt.innerText = "Mahoraga has been defeated";
    }
});

rst.addEventListener("click", (e) =>  {
    clearInterval(adapt);
    rt.innerText = "";
    maho_hp = 100;
    maho_bar.style.width = `100%`;
    play_hp = 100;
    play_bar.style.width = `100%`;
    sec = 5;
    timer.innerText = "Adaptation in " + sec + " seconds";
    startTimer();
});

startTimer();
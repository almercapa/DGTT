const atk = document.getElementById("attack");
const rst = document.getElementById("reset");
let hp = 100;
let hpbar = document.getElementById("hp-fill");
atk.addEventListener("click", (e) => {
    if (hp > 0) {
        hp -= 10;
        hpbar.style.width = `${hp}%`;
    }
    if (hp <= 0) {
        console.log("Mahoraga has been defeated");
    }
});
rst.addEventListener("click", (e) =>  {
    hp = 100;
    hpbar.style.width = `${hp}%`;
});
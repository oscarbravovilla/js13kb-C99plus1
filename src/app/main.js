// lib
import { game } from './js/game';

document.addEventListener("DOMContentLoaded", function () {
    var save = document.getElementById("save");
    var reset = document.getElementById("reset");
    //
    var level = localStorage.getItem("box_99_level");

    if (level !== null && level !== "1") {
        save.classList.remove("dn");
        reset.classList.remove("dn");
        save.innerHTML = "saved LEVEL " + level;
    }
    window.resetLevel = () => {
        localStorage.setItem("box_99_level", "1");
        save.classList.add("dn");
        reset.classList.add("dn");
    }
});

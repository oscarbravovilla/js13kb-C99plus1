import { GameState, Events, Cubo, mensagefinal } from "./enums";
import { levels } from "./levels";
import { colors } from "./lib-shader";
import { soundlibrary } from './sound';
export class GC {
    constructor(context) {
        this.ctx = context;
        this.timeout1;
        this.timeout2;
        this.intervalsAllowed = false;
        this.targetPosition = new THREE.Vector3();
        this.menFinal = "";
        this.i = 0;
    }
    setdebug(element, state) {
        if (this.ctx.debug && state) {
            element.removeAttribute('shader-frog');
            element.setAttribute('shader-frog', 'name:cubo-debug');
        } else if (this.ctx.debug && !state) {
            element.setAttribute('shader-frog', '');
            this.changeColor(element, colors[this.ctx.level - 1][0], false);
        }
    }
    gameRun() {
        setTimeout(() => {
            this.intervalsAllowed = true;
            this.dispatch(Events.RISEUP);
        }, 3000)
    }
    dispatch(direccion) {
        if (this.ctx.state.v === GameState.PLAY) {
            if (direccion === Events.RISEUP) {
                if (this.intervalsAllowed) {
                    this.movimiento(Events.RISEUP);
                    this.timeout1 = setTimeout(function () {
                        this.dispatch(Events.RISEDOWN);
                        if (this.ctx.level_count < this.ctx.Gamelevel.mods.length - 1) {
                            this.ctx.level_count += 1;
                        } else {
                            this.ctx.level_count = 0;
                        }
                        clearTimeout(this.timeout1);
                    }.bind(this), this.ctx.Gamelevel.tiempoCiclo * 1000);
                }
            } else {
                if (this.intervalsAllowed) {
                    this.ctx.camera.emit(Events.RISEDOWN, {});
                    this.movimiento(Events.RISEDOWN);
                    this.timeout2 = setTimeout(function () {
                        this.dispatch(Events.RISEUP);
                        clearTimeout(this.timeout2);
                    }.bind(this), 1000);
                }
            }
        } else {
            return
        }
    }
    movimiento(direccion) {
        if (direccion === Events.RISEUP && this.ctx.fx) {
            setTimeout(() => {
                soundlibrary[2].play();
            }, 500);
        }
        this.ctx.Gamelevel.mods[this.ctx.level_count].map((n) => {
            const key = this.ctx.Gamelevel.key[this.ctx.level_count];
            if (direccion === Events.RISEDOWN && n !== key) {
                this.getCube(n).emit(Events.CUBEDOWN, {});
            } else if (direccion === Events.RISEDOWN && n === key) {
                this.setdebug(this.getCube(n), false)
            } if (direccion === Events.RISEUP) {

                const el = this.getCube(n);
                const pos = el.getAttribute("position");
                if (pos.y !== 0) {
                    this.getCube(n).emit(Events.CUBEUP, {})
                    if (n === key) {
                        this.setdebug(this.getCube(n), true)
                    }
                }
            }
        });
    }
    setTarget() {
        const cubo = document.getElementById(Cubo.CUBO_777);
        const cubo_final = this.getCube(this.ctx.Gamelevel.final);
        let position = new THREE.Vector3();
        cubo_final.object3D.getWorldPosition(position);
        cubo.object3D.position.set(position.x, 0, position.z);
        this.targetPosition = position;
    }
    setInit() {
        const alt = (this.ctx.isVR) ? 0.8 : 1.8;
        const cubo = document.getElementById(Cubo.CUBO_0);
        const cubo_inicio = this.getCube(this.ctx.Gamelevel.inicio);
        let position = new THREE.Vector3();
        cubo_inicio.object3D.getWorldPosition(position);
        cubo.object3D.position.set(position.x, 0, position.z);
        this.ctx.rig.object3D.position.set(position.x, alt, position.z);
    }
    resetPosition() {
        this.ctx.rig.object3D.rotation.set(0, 0, 0);
        this.setTarget();
        this.setInit();
        if (this.ctx.level % 2 !== 0 && !this.ctx.isVR) {
            this.ctx.rig.setAttribute("rotation", '0 -180 0');
            var rotation = this.ctx.rig.getAttribute('rotation');
            this.ctx.rig.components['look-controls'].pitchObject.rotation.x = THREE.Math.degToRad(rotation.x);
            this.ctx.rig.components['look-controls'].yawObject.rotation.y = THREE.Math.degToRad(rotation.y);
        }
        if (this.ctx.isVR) {
            if (this.ctx.level % 2 !== 0) {
                this.ctx.rig.setAttribute("rotation", '0 180 0');
            } else {
                this.ctx.rig.setAttribute("rotation", '0 -180 0');
            }
        }
    }
    fallingDown() {
        soundlibrary[1].play();
        this.clearTimeouts();
        this.ctx.rig.emit(Events.FALL, {});
        this.ctx.fade.emit(Events.FADEIN, {});
        setTimeout(() => {
            this.downCubes();
            this.ctx.level_count = 0;
            this.ctx.state.set(GameState.STARTPLAY);
        }, 1300);
    }

    downCubes() {
        const stageElements = document.getElementsByClassName("stage");
        for (let item of stageElements) {
            item.object3D.position.setY(40);
        }
    }

    clearTimeouts() {
        this.intervalsAllowed = false;
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
    }

    getCube(id) {
        return document.getElementById(`cubo_${id}`);
    }
    setSound() {
        if (this.ctx.fx) {
            setTimeout(() => {
                soundlibrary[0].play();
                soundlibrary[0].loop = true;
            }, 1000);
        }
    }
    setMusic() {
        if (this.ctx.music) {
            setTimeout(() => {
                soundlibrary[3].volume = 0.3;
                soundlibrary[3].play();
                soundlibrary[3].loop = true;
            }, 1000);
        }
    }
    hideShowUI(show, id) {
        document.getElementById(id).style.display = (show) ? "block" : "none";
    }
    setLevel() {
        this.ctx.Gamelevel = levels[this.ctx.level - 1];
        this.ctx.levelDesign.setAttribute('position', `0 ${(this.ctx.level - 1) * -10} 0`);
        this.ctx.gameCubes.setAttribute('position', `4.7 ${((this.ctx.level - 1) * -10)} 4.7`);
        this.changeAllColors();
        this.changeColor(document.getElementById(Cubo.CUBO_0), colors[this.ctx.level - 1][0], false);
        this.changeColor(document.getElementById(Cubo.CUBO_777), colors[this.ctx.level][0], false);
    }
    changeAllColors() {
        let stageElements = document.getElementsByClassName("stage");

        for (let item of stageElements) {
            const color = (this.ctx.level - 1 === 6) ? "rojo" : colors[this.ctx.level - 1][0];
            this.changeColor(item, color, false);
            this.changeBoxProp(item);
        }
        stageElements = document.getElementsByClassName("walls");
        for (let item of stageElements) {
            const color = (this.ctx.level - 1 === 6) ? "rojo" : colors[this.ctx.level - 1][0];
            item.removeAttribute('shader-frog');
            item.setAttribute('shader-frog', `name:wall-${color}`);
        }
    }
    changeBoxProp(el) {
        const posx = el.object3D.position.x;
        const posz = el.object3D.position.z;
        el.removeAttribute('animation__a1');
        el.removeAttribute('animation__a2');
        el.setAttribute('animation__a1', `startEvents: ${Events.CUBEDOWN};property: position; to: ${posx} 40 ${posz};easing: easeInCubic;delay: ${Math.random() * 600}`)
        el.setAttribute('animation__a2', `startEvents: ${Events.CUBEUP};property: position; to: ${posx} ${(this.ctx.level - 1) * -10} ${posz};easing: easeOutCubic;delay: ${Math.random() * 600}`)
    }
    changeColor(el, color, complete) {
        el.removeAttribute('shader-frog');
        const tipo = (complete) ? `name:cubo-${color}-complete` : `name:cubo-${color}`
        el.setAttribute('shader-frog', tipo);
    }
    changeTargets() {
        if (this.ctx.initCubo.getAttribute("id") === Cubo.CUBO_0) {
            this.ctx.initCubo.setAttribute("id", Cubo.CUBO_777);
            this.ctx.finalCubo.setAttribute("id", Cubo.CUBO_0);
        } else {
            this.ctx.initCubo.setAttribute("id", Cubo.CUBO_0);
            this.ctx.finalCubo.setAttribute("id", Cubo.CUBO_777);
        }
    }
    setTargetCube() {
        this.changeColor(document.getElementById(Cubo.CUBO_777), colors[this.ctx.level][0], false)
        this.setTarget();
    }
    storage(set) {
        this.ctx.debug = document.getElementById("nochall").checked;
        if (set) {
            localStorage.setItem("box_99_level", this.ctx.level.toString());
        } else {
            if (localStorage.getItem("box_99_level") === null) {
                localStorage.setItem("box_99_level", "1");
            } else {
                this.ctx.level = parseInt(localStorage.getItem("box_99_level"));
            }
        }
    }
    nextLevel() {
        this.clearTimeouts();
        this.downCubes();
        this.changeTargets();
        this.ctx.level += 1;
        this.ctx.Gamelevel = levels[this.ctx.level - 1];
        this.setTargetCube();
        this.changeAllColors();
        this.storage(true);
        this.ctx.level_count = 0;
        this.ctx.levelDesign.removeAttribute('animation__a1');
        this.ctx.levelDesign.setAttribute('animation__a1', `startEvents: ${Events.DOWNSTAGE};property: object3D.position.y; to:${(this.ctx.level - 1) * -10};easing:easeInOutCubic;dur:2000`);
        this.ctx.gameCubes.setAttribute('position', `4.7 ${((this.ctx.level - 1) * -10)} 4.7s`);
        this.ctx.levelDesign.emit(Events.DOWNSTAGE, null, false);
        setTimeout(() => {
            this.ctx.state.set(GameState.PLAY);
        }, 3000)
    }
    setSettings() {
        this.ctx.music = (document.getElementById("music").checked) ? true : false;
        this.ctx.fx = (document.getElementById("fx").checked) ? true : false;
    }
    end() {
        this.ctx.fade.emit(Events.FADEIN, {});
        setTimeout(() => {
            soundlibrary[3].pause();
            localStorage.setItem("box_99_level", "1");
            this.ctx.gameCubes.setAttribute("visible", "false");
            this.ctx.levelDesign.setAttribute("visible", "false");
            this.ctx.initCubo.setAttribute("visible", "false");
            this.ctx.finalCubo.setAttribute("visible", "false");
            this.ctx.fade.emit(Events.FADEOUT, {});
            this.ctx.sky.setAttribute("color", "#ae0e0e",);
            if (this.ctx.isVR) {
                this.ctx.log.setAttribute("scale", "0.6 0.6 0.6")
            }
            this.typeText()
        }, 1000)
    }
    typeText() {
        if (this.i < mensagefinal.length) {
            this.menFinal += mensagefinal.charAt(this.i);
            this.ctx.log.setAttribute("text", "value", this.menFinal)
            this.i++;
            setTimeout(this.typeText.bind(this), 50);
        }
    }
}

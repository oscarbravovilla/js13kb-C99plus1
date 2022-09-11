import { Events, GameState } from './enums';
import { makeGameCubes, makeLevel } from "./geometry"
import { GC } from './class.gc'

// lib
import './lib-shader';
// components
import './comp.collider'
import './comp.movecontrol'
import "./comp.lookdown"
import { makelibrary } from './sound';

AFRAME.registerSystem('game', {
    schema: {},
    init: function () {

        // isVR
        this.isVR = false;

        // DEBUG MODE
        this.debug = false;

        // MUSIC
        this.music = true;

        // FX SOUND
        this.fx = true;

        // TIME FALL
        this.timeFall = 900; // miliseconds

        // LEVEL
        this.level = 1;

        // STATE
        this.state = {
            v: GameState.START,
            set: (value) => {
                this.state.v = value;
                this.gameControlState();
            }
        }
        // SCENE
        this.scene = this.el.sceneEl;

        // CAMERA
        this.camera = document.getElementById('camera');

        // COLLISION
        this.collider = document.getElementById('collisionRay');
        this.collider.setAttribute('look-down', '');
        this.collider.setAttribute('cheap-collider', '');

        //RIG
        this.rig = document.getElementById("rig");
        this.rig.setAttribute('animation__a2', `dur:${this.timeFall};startEvents: ${Events.FALL};property: position;to: 0 -20 0`);

        // FADE
        this.fade = document.getElementById("fade");
        this.fade.setAttribute('animation__a1', `startEvents: ${Events.FADEIN};property: material.opacity;from: 0 ; to: 1;dur:${this.timeFall}`);
        this.fade.setAttribute('animation__a2', `startEvents: ${Events.FADEOUT};property: material.opacity;from: 1 ; to: 0;dur:${this.timeFall}`);

        // GEOMETRY
        // GAMECUBES
        this.gameCubes = makeGameCubes();
        this.scene.appendChild(this.gameCubes);

        // LEVEL DESING
        this.levelDesign = makeLevel();
        this.scene.appendChild(this.levelDesign);

        // SKY
        this.sky = document.getElementById("sky")

        // INIT & END BOXES
        // INIT
        this.initCubo = document.createElement('a-box');
        this.initCubo.setAttribute('id', 'cubo_0');
        this.initCubo.setAttribute('class', 'initCube');
        this.scene.appendChild(this.initCubo);

        // END
        this.finalCubo = document.createElement('a-box');
        this.finalCubo.setAttribute('id', 'cubo_777');
        this.finalCubo.setAttribute('class', 'endCube');
        this.scene.appendChild(this.finalCubo);

        // LEVEL SELECT
        this.Gamelevel;

        // LEVELS COUNT
        this.level_count = 0;

        // GAME CONTROLLER !EL PUTO AMO!
        this.gc = new GC(this);

        // text log
        this.log = document.getElementById("log");

        // BUTTON DESKTOP
        document.getElementById("bdk").addEventListener("click", (evt) => {
            this.gc.storage(false);
            this.gc.hideShowUI(false, "mainUI");
            this.state.set(GameState.STARTPLAY);
        });

        document.getElementById("bvr").addEventListener("click", () => {
            this.isVR = true;
            this.gc.storage(false);
            this.gc.hideShowUI(false, "mainUI");
            this.rig.setAttribute('move-control', '');
            this.rig.removeAttribute('look-controls');
            this.rig.removeAttribute('awsd-controls');
            
            this.state.set(GameState.STARTPLAY);
        })

        this.scene.addEventListener("loaded", () => {
            makelibrary();
        });

    },
    gameControlState() {
        switch (this.state.v) {
            case GameState.STARTPLAY:
                this.gc.setSettings();
                this.gc.setSound();
                this.gc.setMusic();
                this.gc.setLevel();
                this.gc.resetPosition();
                this.state.set(GameState.PLAY);
                this.fade.emit(Events.FADEOUT, {});
                break
            case GameState.PLAY:
                this.gc.gameRun();
                break
            case GameState.FALLING:
                this.gc.fallingDown();
                break
            case GameState.NEXTLEVEL:
                this.gc.nextLevel();
                break
            case GameState.END:
                this.gc.end();
                break
        }
    }
});




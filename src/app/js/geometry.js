
import { Cubo } from "./class.cubo";
import "./lib-shader"
import { colors } from "./lib-shader";
export const rise = 10;
const wallConst = [
    {
        p: '7 15 0',
        r: '0 90 0'
    },
    {
        p: '-7 15 0',
        r: '0 90 0'
    },
    {
        p: '0 15 -7',
        r: '0 180 0'
    },
    {
        p: '0 15 7',
        r: '0 -180 0'
    },
]
const frameConst = [
    {
        p: '-6.2 0 0',
        r: false
    },
    {
        p: '6.2 0 0',
        r: false
    },
    {
        p: '0 0 6.2',
        r: true
    },
    {
        p: '0 0 -6.2',
        r: true
    }
]
function makeFrame(position) {
    const marcos = document.createElement('a-entity');
    frameConst.map((m, index) => {
        const marco = document.createElement('a-box');
        marco.setAttribute('scale', '-0.5 0.5 12');
        marco.setAttribute('position', m.p);
        marco.setAttribute('shader-frog', `name:cubo-pared`);
        if (m.r) {
            marco.setAttribute('rotation', '0 90 0');
        }
        marcos.appendChild(marco);
    })
    marcos.setAttribute('position', position);
    return marcos;
}
function makeWalls() {
    var walls = document.createElement('a-entity');
    wallConst.map((w) => {
        var wll = document.createElement('a-entity');
        wll.setAttribute('position', w.p);
        wll.setAttribute('rotation', w.r);
        for (let n = 0; n < 10; n++) {
            var muro = document.createElement('a-plane');
            muro.setAttribute('class', 'walls');
            muro.setAttribute('scale', `14 15 1`);
            muro.setAttribute('position', `0 ${(n * 15) - 50} 0`);
            muro.setAttribute('shader-frog', 'name:wall-rojo');
            wll.appendChild(muro)
        };
        walls.appendChild(wll);
    })
    return walls;
}
export function makeGameCubes() {
    const gc = document.createElement('a-entity');
    gc.setAttribute("id", "gameCubes");

    gc.setAttribute("position", "4.7 0 4.7");
    gc.setAttribute("rotation", "0 270 180");
    let cont = 1;
    for (let n = 0; n < 10; n++) {
        for (let nn = 0; nn < 10; nn++) {
            let c = new Cubo(n + .2, 40, nn + .2, { width: 0.95, height: 0.95, depth: 0.95 }, 0, false, `cubo_${cont}`);
            gc.appendChild(c.el);
            cont += 1;
        }
    }
    return gc;
}
function makecubeWalls(position, rotation) {
    const gc = document.createElement('a-entity');
    gc.setAttribute("position", position);
    gc.setAttribute("rotation", rotation);
    let cont = 1;
    for (let n = 0; n < 3; n++) {
        for (let nn = 0; nn < 50; nn++) {
            const scale = Math.random() * (1.5 - 1 + 1) + 1;
            const p = Math.random() < 0.5 ? -1 : 1;
            let c = document.createElement('a-box');
            const r= (Math.random() * (0.2 - 0.1 + 1) + 0.1);
            const rr = (r === 0)?r-0.1:r;
            c.setAttribute("position", `${n + (1 * n) + (p * rr )} ${(Math.random() * (-2 - 0 + 1) + 0)} ${nn + (1 * nn)}`);
            c.setAttribute("scale", `${scale} 1 ${scale}`);
            c.setAttribute('shader-frog', 'name:cubo-pared-complete');
            gc.appendChild(c);
            cont += 1;
        }
    }
    return gc;
}
function makeFrames() {
    const tx = document.createElement('a-entity');
    for (let n = 0; n < 7; n++) {
        tx.appendChild(makeFrame(`0 ${rise * n} 0`));
    }
    return tx;
}
export function makeLevel() {
    const level = document.createElement('a-entity');
    level.appendChild(makecubeWalls("-2 80 7.5", "90 0 0"));
    level.appendChild(makecubeWalls("2 80 -7.5", "90 0 -180"));
    level.appendChild(makecubeWalls("-7.5 80 -2", "90 0 90"));
    level.appendChild(makecubeWalls("7.5 80 2", "90 0 -90"));
    level.appendChild(makeWalls());
    level.appendChild(makeFrames());
    return level;
}
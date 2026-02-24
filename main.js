import getProjectedPoint from './components/projection.js'
import { clear, point, line } from './components/render.js';
import {projectionConfig,gameConfig, changeObject} from './components/game.js'
import { startingValues } from './components/restart.js';
import { mouse, mouseObjRotation, mouseObjMove } from './interactions/mouseOverwiev.js';

//main logic

const FPS = 60;
let fs = gameConfig.objectToRender.fs
let vs = gameConfig.objectToRender.vs

const objectPicker = document.getElementById('figure')

objectPicker.addEventListener('change', (e) => {
    changeObject(e.target.value)
    projectionConfig.dz = startingValues.dz
    projectionConfig.angleX = startingValues.angleX
    projectionConfig.angleY = startingValues.angleY
    projectionConfig.dx = startingValues.dx
    projectionConfig.dy = startingValues.dy
})

function frame(){
    const dt = 1/FPS
    clear()
    fs = gameConfig.objectToRender.fs
    vs = gameConfig.objectToRender.vs
    if (mouse.isDownL){mouseObjRotation(dt)}
    if (mouse.isDownR){mouseObjMove(dt)}
    for (const f of fs){
        for(let i = 0; i< f.length; i++){
            let a = vs[f[i]]
            let b = vs[f[(i+1)%f.length]]
            line(getProjectedPoint(a),getProjectedPoint(b))
        }
    }
    setTimeout(frame, 1000/FPS)
}

setTimeout(frame, 1000/FPS)
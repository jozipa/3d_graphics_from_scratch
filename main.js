import getProjectedPoint from './components/projection.js'
import { clear, point, line } from './components/render.js';
import {gameConfig, changeObject} from './components/game.js'
import { startingValues } from './components/restart.js';


const game = document.getElementById('game')

game.width = gameConfig.width;
game.height = gameConfig.height;


//main logic

const FPS = 60;
let dz = 1;
let angleX = 0
let angleY = 0
let fs = gameConfig.objectToRender.fs
let vs = gameConfig.objectToRender.vs

const objectPicker = document.getElementById('figure')

objectPicker.addEventListener('change', (e) => {
    changeObject(e.target.value)
    dz = startingValues.dz
    angleX = startingValues.angleX
    angleY = startingValues.angleY
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
            line(
                getProjectedPoint(a,angleX,angleY, dz, gameConfig),
                getProjectedPoint(b,angleX,angleY, dz, gameConfig))
        }
    }
    setTimeout(frame, 1000/FPS)
}

setTimeout(frame, 1000/FPS)

//mouseHandling part

game.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

const mouse = {
    x: 0,
    y: 0,
    isDownL: false,
    isDownR: false
}

let prevX = 0
let prevY = 0

//rotateing
game.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (e.button==0){mouse.isDownL=true}
    else {mouse.isDownR=true}
    prevX=e.clientX
    prevY=e.clientY
})

window.addEventListener('mouseup', () => {
    mouse.isDownL = false
    mouse.isDownR = false
})

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function mouseObjRotation(dt){
    angleX+=(mouse.x-prevX)*dt
    angleY-=(mouse.y-prevY)*dt
    prevX=mouse.x
    prevY=mouse.y
}

//zooming
game.addEventListener('wheel', (e)=>{
    e.preventDefault();
    if (!mouse.isDownL && !mouse.isDownR){dz += e.deltaY*0.01}
}, { passive: false })


//moving x or y
function mouseObjMove(dt){
    for (const v of vs){
        v.x += (mouse.x-prevX)*dt
        v.y += (mouse.y-prevY)*dt
    }
    prevX=mouse.x
    prevY=mouse.y
}
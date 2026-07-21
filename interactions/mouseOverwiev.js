import { game } from "../components/game.js"
import { camera } from "../components/camera.js"

const mouse = {
    x: 0,
    y: 0,
    isDownL: false,
    isDownR: false
}

let prevX = 0
let prevY = 0

game.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

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

function mouseObjRotation(dt, obj){
    obj.rotate(((mouse.y-prevY)*dt),(mouse.x-prevX)*dt,0)
    prevX=mouse.x
    prevY=mouse.y
}

game.addEventListener('wheel', (e)=>{
    e.preventDefault();
    if (!mouse.isDownL && !mouse.isDownR){setDz(camera.dz +e.deltaY*0.01)}
}, { passive: false })


//moving x or y
function mouseObjMove(dt, obj){
    obj.move((mouse.x-prevX)*dt,-(mouse.y-prevY)*dt,0)
    prevX=mouse.x
    prevY=mouse.y
}

export {mouse, mouseObjRotation, mouseObjMove}
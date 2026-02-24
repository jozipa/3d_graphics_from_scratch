import { game ,projectionConfig ,setAngleX, setAngleY, setDx, setDy, setDz } from "../components/game.js"


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

function mouseObjRotation(dt){
    setAngleX(projectionConfig.angleX+((mouse.x-prevX)*dt))
    setAngleY(projectionConfig.angleY - ((mouse.y-prevY)*dt))
    
    prevX=mouse.x
    prevY=mouse.y
}

//zooming
game.addEventListener('wheel', (e)=>{
    e.preventDefault();
    if (!mouse.isDownL && !mouse.isDownR){setDz(projectionConfig.dz +e.deltaY*0.01)}
}, { passive: false })


//moving x or y
function mouseObjMove(dt){
    setDx(projectionConfig.dx - (mouse.x-prevX)*dt)
    setDy(projectionConfig.dy - (mouse.y-prevY)*dt)
    prevX=mouse.x
    prevY=mouse.y
}

export {mouse, mouseObjRotation, mouseObjMove}
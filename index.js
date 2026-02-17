const BACKGROUND = "#101010"
const FOREGROUND = "#50FF50"
game.width = 800;
game.height = 800;

const ctx = game.getContext("2d")

function clear() { //clear canvas
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0,0, game.width, game.height)
}

function point({x,y}){ //draw point
    const s = 20*(1/dz)
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x -s/2,y -s/2,s,s)
}

function line(p1, p2){ //draw line
    ctx.strokeStyle = FOREGROUND
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
}

function screen(p){ //translating [-1,1] scale to canvas 
    return {
        x: (p.x+1)/2*game.width,
        y: (1-((p.y+1)/2))*game.height
    }
}

function project({x,y,z}){ //3d calculations
    return {
        x: x/z,
        y: y/z
    }
}

function translate_z({x,y,z}, dz){ //zooming calculations
    return {x,y,z: z+dz}
}

function rotate_xz({x,y,z}, angle){ //rotation with static y
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return {
        x: x*c-z*s,
        y,
        z: x*s+z*c
    }
}

function rotate_yz({x,y,z}, angle){ //rotation with static x 
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return {
        x,
        y: y*c-z*s,
        z: y*s+z*c
    }
}

//Data (vectors and lines)
const vs = [
    {x:0.25,y:0.25,z: 0.25},
    {x:0.25,y:-0.25,z: 0.25},
    {x:-0.25,y:-0.25,z: 0.25},
    {x:-0.25,y:0.25,z: 0.25},
    
    {x:0.25,y:0.25,z: -0.25},
    {x:0.25,y:-0.25,z: -0.25},
    {x:-0.25,y:-0.25,z: -0.25},
    {x:-0.25,y:0.25,z: -0.25},
]

const fs = [
    [0,1,2,3],
    [4,5,6,7],
    [0,4],
    [1,5],
    [2,6],
    [3,7]
]

//main logic

const FPS = 60;
let dz = 1;
let angleX = 0
let angleY = 0

function frame(){
    const dt = 1/FPS
    clear()
    if (mouse.isDownL){mouseObjRotation(dt)}
    if (mouse.isDownR){mouseObjMove(dt)}
    for (const f of fs){
        for(let i = 0; i< f.length; i++){
            a = vs[f[i]]
            b = vs[f[(i+1)%f.length]]
            line(screen(project(translate_z(rotate_yz(rotate_xz(a, angleX),angleY),dz))),
            screen(project(translate_z(rotate_yz(rotate_xz(b, angleX),angleY),dz))))
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

prevX = 0
prevY = 0

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
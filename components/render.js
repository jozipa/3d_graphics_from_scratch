import {gameConfig} from './game.js'

const ctx = game.getContext("2d")

export function clear() { //clear canvas
    ctx.fillStyle = gameConfig.BACKGROUND
    ctx.fillRect(0,0, game.width, game.height)
}

export function point({x,y}){ //draw point
    const s = 20*(1/dz)
    ctx.fillStyle = gameConfig.FOREGROUND
    ctx.fillRect(x -s/2,y -s/2,s,s)
}

export function line(p1, p2){ //draw line
    console.log('liniaaaa');
    
    ctx.strokeStyle = gameConfig.FOREGROUND
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
}
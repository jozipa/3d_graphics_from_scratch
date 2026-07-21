import {gameConfig} from './game.js'

const ctx = game.getContext("2d")

export function clear() { //clear canvas
    ctx.fillStyle = gameConfig.BACKGROUND
    ctx.fillRect(0,0, game.width, game.height)
}

function line(p1, p2, color){ //draw line
    if (p1==null || p2==null) return
    
    ctx.strokeStyle = gameConfig.FOREGROUND
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
}

export function contourPolygon(points, color){
    if (points.length < 3) return;

    line(points[0], points[1])
    line(points[1], points[2])
    line(points[2], points[0])
    
}

export function paintSquare({x1,y1},{x2,y2}){
    ctx.fillStyle = 'red'
    ctx.fillRect(x1,y1, x2, y2)
}

export function fillPolygon(points, color) {
    if (points.length < 3) return;

    ctx.fillStyle = color;
    ctx.beginPath();
    
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.closePath();
    ctx.fill();
}
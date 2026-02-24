import { gameConfig, projectionConfig } from "./game.js"

function toScreenSpace(p,width,height){ //translating [-1,1] scale to canvas 
    return {
        x: (p.x+1)/2*width,
        y: (1-((p.y+1)/2))*height
    }
}

function projectTo2d({x,y,z}){ //3d calculations
    return {
        x: x/z,
        y: y/z
    }
}

function applyZoom({x,y,z}, dx,dy,dz){ //zooming calculations.
    return {x: x+dx,y: y+dy,z: z+dz}
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

export default function getProjectedPoint(p){
    return toScreenSpace(projectTo2d(applyZoom(rotate_yz(rotate_xz(p, projectionConfig.angleX), projectionConfig.angleY),projectionConfig.dx,projectionConfig.dy,projectionConfig.dz)), gameConfig.width, gameConfig.height)
}
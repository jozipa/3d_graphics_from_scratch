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

function applyZoom({x,y,z}, dz){ //zooming calculations
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

export default function getProjectedPoint(p, rx, ry, dz, gameConfig){
    return toScreenSpace(projectTo2d(applyZoom(rotate_yz(rotate_xz(p, rx), ry),dz)), gameConfig.width, gameConfig.height)
}
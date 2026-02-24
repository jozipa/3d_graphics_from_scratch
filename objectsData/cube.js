class Cube {
    center = {x: 0, y: 0, z: 0};
    vs = [];
    fs = [];
    constructor(height, width, depth, center) { //int,int,int, obj[int,int,int]
        this.height = height
        this. width = width
        this.depth = depth
        this.center = center
    }
    generate(){
        
    }
}



let cube = {
    vs: [
        {x:0.25,y:0.25,z: 0.25},
        {x:0.25,y:-0.25,z: 0.25},
        {x:-0.25,y:-0.25,z: 0.25},
        {x:-0.25,y:0.25,z: 0.25},
        
        {x:0.25,y:0.25,z: -0.25},
        {x:0.25,y:-0.25,z: -0.25},
        {x:-0.25,y:-0.25,z: -0.25},
        {x:-0.25,y:0.25,z: -0.25},
    ],
    fs: [
        [0,1,2,3],
        [4,5,6,7],
        [0,4],
        [1,5],
        [2,6],
        [3,7]
    ]
}

export {cube}

import { view_matrix } from "../math/m_4.js";

const defaultCamera = {
    x: 0,
    y: 0.2,
    z: 2,
    angleX: 0,
    angleY: 0,
    angleZ: 0,
    farPlane: 100,
    nearPlane: 0.1
}

class Camera{
    constructor({x,y,z,angleX,angleY,angleZ,farPlane,nearPlane}){
        this.x = x
        this.y = y
        this.z= z
        this.angleX= angleX
        this.angleY= angleY
        this.angleZ= angleZ
        this.farPlane= farPlane
        this.nearPlane= nearPlane
        this.matrix= new Float32Array(16)
        this.matrix_changed= true
    }
    
    move(dx = 0, dy = 0, dz = 0) {
        this.x += dx;
        this.y += dy;
        this.z += dz;
        this.matrix_changed = true;
    }

    rotate(daX = 0, daY = 0, daZ = 0) {
        this.angleX += daX;
        this.angleY += daY;
        this.angleZ += daZ;
        this.matrix_changed = true;
    }

    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.matrix_changed = true;
    }
    
    get_matrix(){
        if (this.matrix_changed){
            this.matrix = view_matrix(this.x,this.y,this.z,this.angleX,this.angleY)
            this.matrix_changed = false;
        }
        return this.matrix
    }
};

export {Camera, defaultCamera}
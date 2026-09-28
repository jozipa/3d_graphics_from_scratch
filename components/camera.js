import { calc_view_matrix, calc_projection_matrix } from "../math/m_4.js";

const defaultCamera = {
    x: 0,
    y: 0.2,
    z: 2,
    angleX: 0,
    angleY: 0,
    angleZ: 0,
    farPlane: 100,
    nearPlane: 0.1,
    fov: 60*Math.PI/180,
    freeCam: true,
    invertAxis: false,
}

class Camera{
    constructor({x,y,z,angleX,angleY,angleZ,farPlane,nearPlane, fov, freeCam, invertAxis}){
        this.x = x
        this.y = y
        this.z= z
        this.angleX= angleX
        this.angleY= angleY
        this.angleZ= angleZ
        this.farPlane= farPlane
        this.nearPlane= nearPlane
        this.fov = fov
        this.freeCam = freeCam
        this.invertAxis = invertAxis

        this.view_matrix= new Float32Array(16)
        this.projection_matrix= new Float32Array(16)
        this.view_matrix_changed= true
        this.projection_matrix_changed = true
    }

    //changers

    changeMode(){
        this.freeCam = !this.freeCam
    }

    changeAxisMode(){
        this.invertAxis = !this.invertAxis
    }
    
    move(dx = 0, dy = 0, dz = 0) {
        this.x += dx;
        this.y += dy;
        this.z += dz;
        this.view_matrix_changed = true;
    }

    rotate(daX = 0, daY = 0, daZ = 0) {
        this.angleX += daX;
        this.angleY += daY;
        this.angleZ += daZ;
        this.view_matrix_changed = true;
    }

    //setters

    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.view_matrix_changed = true;
    }

    //getters
    
    get_view_matrix(){
        if (this.view_matrix_changed){
            this.view_matrix = calc_view_matrix(this.x,this.y,this.z,this.angleX,this.angleY)
            this.view_matrix_changed = false;
        }
        return this.view_matrix
    }

    get_projection_matrix(width, height){
        if (this.projection_matrix_changed){
            this.projection_matrix = calc_projection_matrix(this.fov,width,height, this.nearPlane, this.farPlane)
            this.projection_matrix_changed = false
            
        }
        return this.projection_matrix
    }
};

export {Camera, defaultCamera}
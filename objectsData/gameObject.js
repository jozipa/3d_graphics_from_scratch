import { module_matrix } from "../math/m_4.js"

export class GameObject{
    constructor(type,color="#3b3b3fff",x=0,y=0,z=0,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1,contour=false){
        this.data = type.data;
        this.pivotType = type.pivotType;
        this.position = {x,y,z};
        this.rotation = {x: rx,y: ry,z: rz};
        this.scale = {x: sx,y: sy,z: sz};
        this.matrix_changed = true;
        this.matrix = this.get_matrix();
        this.color = color
        this.contour = contour
    }

    get_matrix(){
        if (this.matrix_changed){
            let objVector = [this.position.x,this.position.y,this.position.z,1];
            this.matrix =  module_matrix(objVector,this.rotation.x,this.rotation.y,this.rotation.z,[this.scale.x,this.scale.y,this.scale.z])
            this.matrix_changed = false;
        }
        return this.matrix;
    }

    move(dx = 0, dy = 0, dz = 0) {
        this.position.x += dx;
        this.position.y += dy;
        this.position.z += dz;
        this.matrix_changed = true;
    }

    rotate(daX = 0, daY = 0, daZ = 0) {
        this.rotation.x += daX;
        this.rotation.y += daY;
        this.rotation.z += daZ;
        this.matrix_changed = true;
    }

    setPosition(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.matrix_changed = true;
    }   
}
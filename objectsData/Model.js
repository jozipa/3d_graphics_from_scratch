export class Model{
    constructor(mesh, pivotType='origin'){
        this.mesh = mesh
        this.pivotVec = []
        this.pivotType = pivotType
        this.pivotChanged = false
        
        this.calcPivotVector()
    }
    //setters
    setPivotType(pivotType){
        this.pivotType = pivotType
        this.calcPivotVector()
        this.pivotChanged = true
    }
    setMesh(mesh){
        this.mesh = mesh
        this.calcPivotVector()
    } 
    setPivotVec(x,y,z){
        this.pivotVec = [x,y,z]
    }

    //getters
    getPivotVector4(){
        this.pivotChanged = false
        return [-this.pivotVec[0],-this.pivotVec[1],-this.pivotVec[2],1]
    }

    calcPivotVector(){
        const bounds = this.mesh.bounds
        switch (this.pivotType) {
            case 'center':
                this.pivotVec = [(bounds.max[0]+bounds.min[0])/2,(bounds.max[1]+bounds.min[1])/2,(bounds.max[2]+bounds.min[2])/2]
                break
            case 'bottom':
                this.pivotVec = [(bounds.max[0]+bounds.min[0])/2,bounds.min[1],(bounds.max[2]+bounds.min[2])/2]
                break
            case 'up':
                this.pivotVec = [(bounds.max[0]+bounds.min[0])/2,bounds.max[1],(bounds.max[2]+bounds.min[2])/2]
                break
            default:  // 'origin'
                this.pivotType = [0,0,0]
                break;
        }
    }

}
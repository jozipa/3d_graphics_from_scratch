import Mesh from "../renderer/Mesh.js";

export default class ObjectsData{
    constructor(gl,positionAttributeLocation,cube, pyramid, house){

        this.meshes = {
            cube: new Mesh(gl,positionAttributeLocation,this.get_vertex_arr(cube)),
            pyramid: new Mesh(gl,positionAttributeLocation,this.get_vertex_arr(pyramid)),
            house: new Mesh(gl,positionAttributeLocation,this.get_vertex_arr(house)),
        }

        this.models = {
            cube: {
                mesh: this.meshes.cube,
                pivotType: "center",
            },
            pyramid: {
                mesh: this.meshes.pyramid,
                pivotType: "bottom",
            },
            house: {
                mesh: this.meshes.house,
                pivotType: "bottom",
            }
        }
    }
    get_vertex_arr(data){
        let vertex_arr = [];
        for (let i = 0; i<data.fs.length; i++){
            for (let j = 0; j<3; j++){
                vertex_arr.push(data.vs[data.fs[i][j]].x)
                vertex_arr.push(data.vs[data.fs[i][j]].y)
                vertex_arr.push(data.vs[data.fs[i][j]].z)
            }
        }
        return vertex_arr;
    }
}



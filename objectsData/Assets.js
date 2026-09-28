import Mesh from "../renderer/Mesh.js";
import { Model } from "./Model.js";
import { cube } from "./cube.js";
import { pyramid } from "./pyramid.js";
import { house } from "./house.js";

export default class Assets{
    constructor(gl,positionAttributeLocation){
        this.gl = gl
        this.positionAttributeLocation = positionAttributeLocation

        this.meshes = {}
        this.models = {}
    }
    init(){
        this.load_meshes()
        this.load_models()
    }
    load_meshes(){
        this.add_new_mesh("cube", cube);
        this.add_new_mesh("pyramid", pyramid);
        this.add_new_mesh("house", house);
    }
    load_models(){
        this.add_new_model("cube","cube","center")
        this.add_new_model("pyramid", "pyramid", "bottom")
        this.add_new_model("house", "house", "bottom")
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
    mesh_exists(name){
        if (Object.hasOwn(this.meshes, name)){
            return true
        }
        return false
    }
    add_new_mesh(name, data){ //for now dara as in cube.js
        if (this.mesh_exists(name)){
            console.warn(`Mesh with name: ${name} already exists`);
            return
        }
        this.meshes[name] = new Mesh(this.gl,this.positionAttributeLocation,this.get_vertex_arr(data))
    }

    add_new_model(name, meshName, pivotType="center"){
        if (Object.hasOwn(this.models, name)){
            console.warn(`Model with name: ${name} already exists`);
            return
        }
        if (!this.mesh_exists(meshName)){
            console.warn(`Mesh with name: ${meshName} doesn't exists`)
            return
        }
        this.models[name] = new Model(this.meshes[meshName], pivotType)
    }
}



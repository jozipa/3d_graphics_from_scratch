import Mesh from "../renderer/Mesh.js";
import { Model } from "./Model.js";
import { cube } from "../../objectsData/cube.js";
import { pyramid } from "../../objectsData/pyramid.js";
import { house } from "../../objectsData/house.js";
import { objToVertexArrayParser } from "../../models/objParser.js";
import { Object3d } from "./Object3d.js";

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
        this.add_new_mesh("cube", this.get_vertex_arr(cube));
        
        //this.add_new_mesh("pyramid", this.get_vertex_arr(pyramid));
        //this.add_new_mesh("house", this.get_vertex_arr(house));
    }
    load_models(){
        this.add_new_model("cube","cube","center")
        //this.add_new_model("pyramid", "pyramid", "bottom")
        //this.add_new_model("house", "house", "bottom")
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
            console.error(`Mesh with name: ${name} already exists`);
            return false
        }
        this.meshes[name] = new Mesh(this.gl,this.positionAttributeLocation,data)
        return true
    }

    async load_newOBJ_object(meshName, modelName, url, pivotType){
        let urlData = await fetch(url);
        let dataOBJ = await urlData.text();

        let vertexArray = objToVertexArrayParser(dataOBJ);

        let meshAddSuccesfully = this.add_new_mesh(meshName, vertexArray)
        if (!meshAddSuccesfully) return

        let modelAddedSuccesfully = this.add_new_model(modelName, meshName, pivotType)
        if (!modelAddedSuccesfully) return
        console.log(this.models[modelName], 'grunealdas',modelName, this.models);
        
        
        return new Object3d(this.models[modelName])
    }

    add_new_model(name, meshName, pivotType="origin"){
        if (Object.hasOwn(this.models, name)){
            console.error(`Model with name: ${name} already exists`);
            return false
        }
        if (!this.mesh_exists(meshName)){
            console.error(`Mesh with name: ${meshName} doesn't exists`)
            return false
        }
        this.models[name] = new Model(this.meshes[meshName], pivotType)
        return true
    }


}



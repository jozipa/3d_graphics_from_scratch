import { GameObject } from "../objectsData/gameObject.js";

const defaultGameConfig = {
    width: 860,
    height: 480,
    FOREGROUND: '#50FF50',
    BACKGROUND: '#101010',
}

class GameConfig{
    constructor({width, height, BACKGROUND, FOREGROUND}){
        this.width = width
        this.height = height
        this.BACKGROUND = BACKGROUND
        this.FOREGROUND = FOREGROUND
        this.objectsToRender = [null]
        this.freeCam = true
        this.game = document.getElementById("game")

        this.game.width = this.width
        this.game.height = this.height


        this.forPicker = document.getElementById("foreground")
        this.backPicker = document.getElementById('background')

        this.forPicker.addEventListener('input', (e) => {
            this.FOREGROUND = e.target.value; 
        });

        this.backPicker.addEventListener('input', (e) => {
            this.BACKGROUND = e.target.value; 
        });
    }

    changeMode(){
        this.freeCam != this.freeCam
    }

    gen_flat_cubic_map(objectsData){
        let size = 0.5;
        let scale = 1;
        let r_size = size*scale;
        
        let start_x = -(24*size+size/2)
        let start_z = start_x

        
        for (let i = 0; i<2500;i++){
            this.objectsToRender.push(new GameObject(objectsData.models.cube,'#33ce45ff',start_x+((i%50)*r_size),0,start_z+(Math.floor(i/50)*r_size),0,0,0,scale,0.1,scale))
        }
    }

    changeObject(objectsData, val){
        console.log(objectsData);
        
        console.log(objectsData.models[val].mesh, val);
        
        this.objectsToRender[0] = new GameObject(objectsData.models[val])
    }
}

export {GameConfig, defaultGameConfig}
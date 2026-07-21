import objectsData from "../objectsData/objectsData.js";
import { GameObject } from "../objectsData/gameObject.js";

let gameConfig = {
    width: 980,
    height: 540,
    BACKGROUND: "#101010",
    FOREGROUND: "rgba(80, 255, 80, 1)",
    objectsToRender: [new GameObject(objectsData.cube)],
    floor: [],
    freeCam: true,
}

const game = document.getElementById('game')

game.width = gameConfig.width;
game.height = gameConfig.height;

const forPicker = document.getElementById('foreground')
const backPicker = document.getElementById('background')

forPicker.addEventListener('input', (e) => {
    gameConfig.FOREGROUND = e.target.value; 
});

backPicker.addEventListener('input', (e) => {
    gameConfig.BACKGROUND = e.target.value; 
});

function changeObject(val){
    gameConfig.objectsToRender[0] = new GameObject(objectsData[val])
}

function gen_flat_cubic_map(){
    let size = 0.5;
    let scale = 1;
    let r_size = size*scale;
    
    let start_x = -(24*size+size/2)
    let start_z = start_x
    for (let i = 0; i<2500;i++){
        gameConfig.floor.push(new GameObject(objectsData.cube,'#33ce45ff',start_x+((i%50)*r_size),0,start_z+(Math.floor(i/50)*r_size),0,0,0,scale,0.1,scale))
    }
}

function changeMode(){
    gameConfig.freeCam = !gameConfig.freeCam
}

export {game ,gameConfig, changeObject, changeMode, gen_flat_cubic_map}
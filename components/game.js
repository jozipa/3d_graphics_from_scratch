import { cube } from "../objectsData/cube.js";
import { pyramid } from "../objectsData/pyramid.js";
import { startingValues } from "./restart.js";

let gameConfig = {
    width: startingValues.width,
    height: startingValues.height,
    BACKGROUND: startingValues.BACKGROUND,
    FOREGROUND: startingValues.FOREGROUND,
    objectToRender: cube
}

const forPicker = document.getElementById('foreground')
const backPicker = document.getElementById('background')


forPicker.addEventListener('input', (e) => {
    gameConfig.FOREGROUND = e.target.value; 
});

backPicker.addEventListener('input', (e) => {
    gameConfig.BACKGROUND = e.target.value; 
});

function changeObject(val){
    if (val == "pyramid"){
        gameConfig.objectToRender = pyramid
    } else if (val == "cube"){
        gameConfig.objectToRender = cube
    }
}




export {gameConfig, changeObject}
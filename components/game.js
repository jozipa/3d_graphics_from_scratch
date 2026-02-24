import { cube } from "../objectsData/cube.js";
import { pyramid } from "../objectsData/pyramid.js";
import { house } from "../objectsData/house.js";
import { startingValues } from "./restart.js";

let gameConfig = {
    width: startingValues.width,
    height: startingValues.height,
    BACKGROUND: startingValues.BACKGROUND,
    FOREGROUND: startingValues.FOREGROUND,
    objectToRender: cube,
}

const game = document.getElementById('game')

game.width = gameConfig.width;
game.height = gameConfig.height;

let projectionConfig = {
    dz: 1,
    dx: 0,
    dy: 0,
    angleX: 0,
    angleY: 0,
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
    } else if (val == "house"){
        gameConfig.objectToRender = house
    }
}

function setAngleX(x){
    projectionConfig.angleX = x
}

function setAngleY(y){
    projectionConfig.angleY = y
}
function setDz(dz){
    projectionConfig.dz = dz
}

function setDx(dx){
    projectionConfig.dx = dx
}

function setDy(dy){
    projectionConfig.dy = dy
}

export {game ,gameConfig, projectionConfig, changeObject, setAngleX, setAngleY, setDx, setDy,setDz}
import {cube} from './objectsData/cube.js'
import {pyramid} from './objectsData/pyramid.js'
import {house} from './objectsData/house.js'


import { projection_matrix, transposeMatrix4 } from './math/m_4.js';
import { Mouse } from './interactions/mouseOverwiev.js';
import { handleKeyboard } from './interactions/keyboardHandle.js';
import htmlGenerator from './htmlGeneration/generator.js';
import { mvp_m4 } from './math/mvp_render.js';

import { Camera, defaultCamera } from './components/Camera.js';
import {Renderer} from './renderer/Renderer.js'
import {GameConfig, defaultGameConfig} from './components/GameConfig.js';
import ObjectsData from './objectsData/objectsData.js';

const FPS = 60;

//game initialization

let camera1 = new Camera(defaultCamera)
let gameConfig1 = new GameConfig(defaultGameConfig)
let renderer1 = new Renderer(gameConfig1)
let objectsData1 = new ObjectsData(renderer1.gl,renderer1.positionAttributeLocation,cube, pyramid, house)
gameConfig1.changeObject(objectsData1, "cube")

let mouse1 = new Mouse(gameConfig1.game, camera1)
htmlGenerator()
gameConfig1.gen_flat_cubic_map(objectsData1)


function frame(timestamp){
    const dt = 1/FPS

    renderer1.clear()
    
    let mainObj=gameConfig1.objectsToRender[0]
    mainObj.contour = true

    if (mouse1.isDownL){mouse1.mouseObjRotation(dt, mainObj)}
    if (mouse1.isDownR){mouse1.mouseObjMove(dt, mainObj)}
    handleKeyboard(dt, mainObj);

    let v = camera1.get_matrix();
    let p = projection_matrix(60*Math.PI/180,gameConfig1.width,gameConfig1.height,camera1.nearPlane,camera1.farPlane);
    

    gameConfig1.objectsToRender.forEach((obj)=>{
        let m = obj.get_matrix();
        let mvp = mvp_m4(m,v,p)

        let color_vec = obj.get_color_arr()
        console.log(color_vec);
        

        renderer1.render(obj, mvp, color_vec)
    })

    requestAnimationFrame(frame);
}


requestAnimationFrame(frame);

export {camera1, gameConfig1, objectsData1}

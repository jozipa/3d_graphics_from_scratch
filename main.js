import { projection_matrix } from './math/m_4.js';
import { clear } from './components/render.js';
import {gameConfig, gen_flat_cubic_map} from './components/game.js'
import { mouse, mouseObjRotation, mouseObjMove } from './interactions/mouseOverwiev.js';
import { handleKeyboard, keys } from './interactions/keyboardHandle.js';
import { camera } from './components/camera.js';

import { render_from_arr, sort_triangles_by_dist } from './components/projection.js';
import htmlGenerator from './htmlGeneration/generator.js';
//main logic

const FPS = 60;

function frame(){
    const dt = 1/FPS
    clear()
    
    let mainObj=gameConfig.objectsToRender[0]
    mainObj.contour = true

    if (mouse.isDownL){mouseObjRotation(dt, mainObj)}
    if (mouse.isDownR){mouseObjMove(dt, mainObj)}
    handleKeyboard(dt, mainObj);

    let v = camera.get_matrix();
    let p = projection_matrix(60*Math.PI/180,gameConfig.width,gameConfig.height,camera.nearPlane,camera.farPlane);

    let superArr = przepisz_tablice(gameConfig.floor,[])
    superArr.push(mainObj)
    
    let render_arr = sort_triangles_by_dist(superArr,v,p)
    render_from_arr(render_arr)

    setTimeout(frame, 1000/FPS)
}

function przepisz_tablice(tab1, tab2){
    for (let i = 0; i<tab1.length; i++){
        tab2.push(tab1[i]);
    }
    return tab2
}

function init(){
    htmlGenerator()
    gen_flat_cubic_map()
    setTimeout(frame, 1000/FPS)
}

init()

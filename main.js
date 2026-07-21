import { projection_matrix, transposeMatrix4 } from './math/m_4.js';
import { clear } from './components/render.js';
import {gameConfig, gen_flat_cubic_map} from './components/game.js'
import { mouse, mouseObjRotation, mouseObjMove } from './interactions/mouseOverwiev.js';
import { handleKeyboard, keys } from './interactions/keyboardHandle.js';
import { camera } from './components/camera.js';
import {render_OpenGl2, clear_OpenGl2} from './renderer/openGl_render.js'

import { render_from_arr, sort_triangles_by_dist } from './components/projection.js';
import htmlGenerator from './htmlGeneration/generator.js';
import { mvp_m4 } from './math/mvp_render.js';
//main logic

const FPS = 60;

function frame(){
    const dt = 1/FPS

    clear_OpenGl2();
    
    let mainObj=gameConfig.objectsToRender[0]
    mainObj.contour = true

    if (mouse.isDownL){mouseObjRotation(dt, mainObj)}
    if (mouse.isDownR){mouseObjMove(dt, mainObj)}
    handleKeyboard(dt, mainObj);

    let v = camera.get_matrix();
    let p = projection_matrix(60*Math.PI/180,gameConfig.width,gameConfig.height,camera.nearPlane,camera.farPlane);
    

    gameConfig.objectsToRender.forEach((obj)=>{
        let m = obj.get_matrix();
        let mvp = mvp_m4(m,v,p)

        let vertex_arr = obj.get_vertex_arr()

        render_OpenGl2(vertex_arr,3,"gl.FLOAT",false,0,0, transposeMatrix4(mvp))
    })

    //let render_arr = sort_triangles_by_dist(gameConfig.objectsToRender,v,p)
    //render_from_arr(render_arr)

    setTimeout(frame, 1000/FPS)
}




function init(){
    htmlGenerator()
    gen_flat_cubic_map()
    setTimeout(frame, 1000/FPS)
}

init()

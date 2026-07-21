import { gameConfig } from "../components/game.js";
import { rotationY_matrix } from "../math/m_3.js";
import { camera } from "../components/camera.js";


const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    ShiftLeft: false,
    Space: false,
    CapsLock: false,
};

window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = false;
    }
});


function handleKeyboard(dt, obj) {
    const moveSpeed = 1 * dt;   // Prędkość przesuwania
    const rotateSpeed = 1 * dt; // Prędkość obrotu

    if (gameConfig.freeCam){
        camera_movement(moveSpeed, rotateSpeed);
    } else {
        object_movement(moveSpeed, rotateSpeed, obj)
    }

}

function object_movement(moveSpeed, rotateSpeed, obj){
            if (!keys.ShiftLeft) {
                if (keys.ArrowLeft)  obj.rotate(0,-rotateSpeed,0);
                if (keys.ArrowRight) obj.rotate(0,rotateSpeed,0);
                if (keys.ArrowUp)    obj.rotate(-rotateSpeed,0,0);
                if (keys.ArrowDown)  obj.rotate(rotateSpeed,0,0)
            } 
            else {
                if (keys.ArrowLeft){
                    obj.move(-moveSpeed,0,0)
                }  
                if (keys.ArrowRight){
                    obj.move(moveSpeed,0,0)
                } 
                if (keys.ArrowUp){                                          // Arrows up/down are using third column (z in the begining)
                    obj.move(0,0,-moveSpeed)
                }    
                if (keys.ArrowDown){
                    obj.move(0,0,moveSpeed)
                }
                if (keys.Space){
                   obj.move(0,moveSpeed,0);
                }
                if (keys.CapsLock){
                    obj.move(0,-moveSpeed,0);        
                }     
            }    
}


function camera_movement(moveSpeed, rotateSpeed){
    let movement_mat = rotationY_matrix(camera.angleY)
    
    if (!keys.ShiftLeft) {
        if (keys.ArrowLeft)  camera.rotate(0,rotateSpeed,0);
        if (keys.ArrowRight) camera.rotate(0,-rotateSpeed,0);
        if (keys.ArrowUp)    camera.rotate(rotateSpeed,0,0);
        if (keys.ArrowDown)  camera.rotate(-rotateSpeed,0,0);
    } 
    else {
        if (keys.ArrowLeft){
            camera.move(-(movement_mat[0]*moveSpeed),0,-(movement_mat[6]*moveSpeed));// Arrows left/rigth are useing first column of matrix (in the begining
        }                                                                              // just moving arund x)     
        if (keys.ArrowRight){            
            camera.move((movement_mat[0]*moveSpeed),0,(movement_mat[6]*moveSpeed));
        } 
        if (keys.ArrowUp){                                          // Arrows up/down are using third column (z in the begining)
            camera.move(-movement_mat[2]*moveSpeed,0,-movement_mat[8]*moveSpeed);
        }    
        if (keys.ArrowDown){
            camera.move(movement_mat[2]*moveSpeed,0,movement_mat[8]*moveSpeed);
        }
        if (keys.Space){
            camera.move(0,moveSpeed,0);
        }
        if (keys.CapsLock){
            camera.move(0,-moveSpeed,0);        }     
        }
}

export { keys, handleKeyboard };
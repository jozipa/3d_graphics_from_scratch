import { rotationY_matrix } from "../../math/m_3.js";
import { KeyboardActionsManager } from "./KeyboardActionsManager.js";

export default class Keyboard{
    constructor(camera){
        this.camera = camera

        this.actions = new KeyboardActionsManager()

        this.targetElement = camera
        this.invertAxis = -1


        window.addEventListener('keydown', (e) => {
            let pressed_key = e.code
            let key_action = this.actions.KEY_STATES[pressed_key]
            if (key_action!=null){
                this.actions[key_action].isPressed = true
                e.preventDefault()
            }
        });

        window.addEventListener('keyup', (e) => {
            let pressed_key = e.code
            let key_action = this.actions.KEY_STATES[pressed_key]
            if (key_action!=null){
                this.actions[key_action].isPressed = false
            }
        });
    }

    update(dt){
        if (this.camera.freeCam){
            this.camera_movement(dt)
        } else {
            this.object_movement(dt)
        }
    }
    
    camera_movement(dt){
        let movement_mat = rotationY_matrix(this.camera.angleY) 
        
        if (!this.actions.modeKey.isPressed) {
            if (this.actions.leftKey.isPressed)  this.camera.rotate(0,dt,0);
            if (this.actions.rightKey.isPressed) this.camera.rotate(0,-dt,0);
            if (this.actions.forwardKey.isPressed) this.camera.rotate(dt,0,0);
            if (this.actions.backKey.isPressed)  this.camera.rotate(-dt,0,0);
        } else {
            if (this.actions.leftKey.isPressed){
                this.camera.move(-(movement_mat[0]*dt),0,-(movement_mat[6]*dt));// Arrows left/rigth are useing first column of matrix (in the begining
            }                                                                              // just moving arund x)     
            if (this.actions.rightKey.isPressed){            
                this.camera.move((movement_mat[0]*dt),0,(movement_mat[6]*dt));
            } 
            if (this.actions.forwardKey.isPressed){                                          // Arrows up/down are using third column (z in the begining)
                this.camera.move(-movement_mat[2]*dt,0,-movement_mat[8]*dt);
            }    
            if (this.actions.backKey.isPressed){
                this.camera.move(movement_mat[2]*dt,0,movement_mat[8]*dt);
            }
            if (this.actions.upKey.isPressed){
                this.camera.move(0,dt,0);
            }
            if (this.actions.downKey.isPressed){
                this.camera.move(0,-dt,0);        }     
            }
    }
    object_movement(dt){
            if (!this.actions.modeKey.isPressed) {
                if (this.actions.leftKey.isPressed)  this.targetElement.rotate(0,-dt*this.invertAxis,0);
                if (this.actions.rightKey.isPressed) this.targetElement.rotate(0,dt*this.invertAxis,0);
                if (this.actions.forwardKey.isPressed)    this.targetElement.rotate(-dt*this.invertAxis,0,0);
                if (this.actions.backKey.isPressed)  this.targetElement.rotate(dt*this.invertAxis,0,0)
            } 
            else {
                if (this.actions.leftKey.isPressed){
                    this.targetElement.move(-dt,0,0)
                }  
                if (this.actions.rightKey.isPressed){
                    this.targetElement.move(dt,0,0)
                } 
                if (this.actions.forwardKey.isPressed){                                          // Arrows up/down are using third column (z in the begining)
                    this.targetElement.move(0,0,-dt)
                }    
                if (this.actions.backKey.isPressed){
                    this.targetElement.move(0,0,dt)
                }
                if (this.actions.upKey.isPressed){
                   this.targetElement.move(0,dt,0);
                }
                if (this.actions.downKey.isPressed){
                    this.targetElement.move(0,-dt,0);        
                }     
            }    
    }
    //setters
    set_camera(camera){
        this.camera = camera
    }
}
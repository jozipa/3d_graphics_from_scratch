import {Mouse} from "../interactions/mouseOverwiev.js"
import Keyboard from "../interactions/keyboardHandle/Keyboard.js"

export class InputManager{
    constructor(canvas, camera){
        this.mouse = new Mouse(canvas, camera)
        this.keyboard = new Keyboard(camera)
    }
    update(dt){
        this.mouse.update(dt)
        this.keyboard.update(dt)
    }
}
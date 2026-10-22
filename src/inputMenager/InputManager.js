import {Mouse} from "./mouse/Mouse.js"
import Keyboard from "./keyboard/Keyboard.js"

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
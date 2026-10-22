import { Engine } from "./src/Engine.js";

let engine = new Engine({
    canvasId: "game",
    width: 860,
    height: 480
})

engine.init()

/*
let newElement = await engine.assets.load_newOBJ_object('tree','tree','./models/ObjFiles/model.obj', 'bottom')
engine.scene.add_object(newElement)
engine.input.mouse.targetElement = newElement
*/














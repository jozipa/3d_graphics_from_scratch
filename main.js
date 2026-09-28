import { Engine } from "./components/Engine.js";
import { Object3d } from "./objectsData/Object3d.js";

let engine = new Engine({
    canvasId: "game",
    width: 860,
    height: 480
})



engine.init()
let focused_object = engine.input.mouse.targetElement
focused_object.model.setPivotType('bottom')

engine.scene.delete_object(focused_object)
let piramidka = new Object3d(engine.assets.models.pyramid)
engine.input.mouse.setTargetElement(piramidka)
engine.scene.add_object(piramidka)
piramidka.model.setPivotType('up')






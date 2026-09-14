import genSelect from "./select.js";
import genCheckBox from "./checkbox.js";
import objectsData from "../objectsData/objectsData.js";

import {gameConfig1, objectsData1} from '../main.js'

const html_select = document.getElementById('select-block')
const html_checkBox = document.getElementById('checkbox-block')

function htmlGenerator(){
    let select = genSelect(objectsData1, html_select, 'block_selection')
    let checkBox = genCheckBox(html_checkBox, 'camera_mode')

    select.addEventListener('change', (e) => {
        e.target.blur();
        gameConfig1.changeObject(objectsData1, e.target.value)
    })

    checkBox.addEventListener('change', (e) => {
        e.target.blur();
        gameConfig1.changeMode()
    })
}

export default htmlGenerator


import genSelect from "./select.js";
import genCheckBox from "./checkbox.js";
import objectsData from "../objectsData/objectsData.js";

import {changeObject, changeMode} from '../components/game.js'

const html_select = document.getElementById('select-block')
const html_checkBox = document.getElementById('checkbox-block')

function htmlGenerator(){
    let select = genSelect(objectsData, html_select, 'block_selection')
    let checkBox = genCheckBox(html_checkBox, 'camera_mode')

    select.addEventListener('change', (e) => {
        e.target.blur();
        changeObject(e.target.value)
    })

    checkBox.addEventListener('change', (e) => {
        e.target.blur();
        changeMode()
    })
}

export default htmlGenerator


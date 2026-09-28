import genSelect from "./select.js";
import genCheckBox from "./checkbox.js";

const html_select = document.getElementById('select-block')
const html_checkBox = document.getElementById('checkbox-block')

function htmlGenerator(objectsData){
    let select = genSelect(objectsData, html_select, 'block_selection')
    let checkBox = genCheckBox(html_checkBox, 'camera_mode')

    select.addEventListener('change', (e) => {
        e.target.blur();
        gameConfig1.changeObject(objectsData, e.target.value)
    })

    checkBox.addEventListener('change', (e) => {
        e.target.blur();
        camera1.changeMode()
        console.log('changins');
        
    })
}

export default htmlGenerator


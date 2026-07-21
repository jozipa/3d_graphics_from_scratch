function genCheckBox(checkBoxContainer, id) { // object, html div, string (id)
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = true

    checkBoxContainer.appendChild(checkBox);

    return checkBox
}

export default genCheckBox

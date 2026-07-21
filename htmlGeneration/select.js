
function genSelect(data, selectContainer, id) { // object, html div, string (id)
    const select = document.createElement('select');
    select.id = id

    Object.entries(data).forEach(([name,data]) => {
        const option = document.createElement('option');
        option.value = name.toLowerCase();
        option.textContent = name;         
        select.appendChild(option);
    });

    selectContainer.appendChild(select);
    return select
}

export default genSelect

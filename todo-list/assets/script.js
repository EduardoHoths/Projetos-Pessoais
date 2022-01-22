let list = document.getElementById('list')

function addTask(e) {
    if (e.key !== 'Enter') {
        return
    }

    let newTask = document.getElementById('addTask')

    createTaskArea(newTask.value)
    createEventListener()  

    newTask.value = ''
}

function createEventListener(){
    let checkboxes = document.querySelectorAll('.task')
    checkboxes.forEach(checkbox => checkbox.addEventListener('click', checked))      
}

function createTaskArea(value){
    let div = document.createElement('div')

    let label = document.createElement('label')
    label.innerHTML = `${value.toUpperCase()}`

    let btnDelete = document.createElement('label')
    btnDelete.innerHTML = `<img src='https://cdn-icons-png.flaticon.com/512/6269/6269603.png'>`

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')

    div.appendChild(checkbox).classList.add('task')
    div.appendChild(label)    
    div.appendChild(btnDelete).addEventListener('click', deleteTask)    
    list.appendChild(div)
}

function checked(e){
    if(e.target.classList == 'task checked'){
        e.target.classList.remove('checked')
    } else {
        e.target.classList.add('checked')
    }    
}
function deleteTask(e){
    list = document.querySelector('#list')
    list.removeChild(e.path[2])
}

window.addEventListener('keydown', addTask)
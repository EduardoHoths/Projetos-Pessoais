class Task {
    constructor(task, status) {
        this.task = task
        this.status = status
    }
}
class DataBase {
    constructor() {
        const id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getNextId() {
        const nextId = localStorage.getItem('id')
        return parseInt(nextId) + 1
    }
    record(task) {
        const id = this.getNextId()
        localStorage.setItem(id, JSON.stringify(task))
        localStorage.setItem('id', id)
    }
    retrieveRecords() {
        const id = localStorage.getItem('id')

        let tasks = Array()

        for (let i = 1; i <= id; i++) {
            let task = JSON.parse(localStorage.getItem(i))

            if (task === null) {
                continue
            }

            task.id = i
            tasks.push(task)
        }
        return tasks
    }
    remove(id) {
        localStorage.removeItem(id)
    }
}

const dataBase = new DataBase()

const list = document.getElementById('list')

function addTask(e) {
    if (e.key !== 'Enter') {
        return
    }

    const newTask = document.getElementById('addTask')

    if(newTask.value !== ''){
        const task = new Task(newTask.value, '')
        dataBase.record(task)
    }

    createTaskArea()
    newTask.value = ''
}

function createEventListener() {
    const checkboxes = document.querySelectorAll('.task')
    checkboxes.forEach(checkbox => checkbox.addEventListener('click', checked))
}

function createTaskArea() {
    let tasks = dataBase.retrieveRecords()
    list.innerHTML = ''

    tasks.forEach(task => {
        const div = document.createElement('div')

        const label = document.createElement('label')
        label.innerHTML = `${task.task.toUpperCase()}`

        const btnDelete = document.createElement('label')
        btnDelete.innerHTML = `<img src='https://cdn-icons-png.flaticon.com/512/6269/6269603.png'>`
        btnDelete.id = task.id
        btnDelete.addEventListener('click', deleteTask)

        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.id = task.id

        div.appendChild(checkbox).classList.add('task')
        div.appendChild(label)
        div.appendChild(btnDelete)
        list.appendChild(div)
    })
    createEventListener()
}

function checked(event) {
     if (event.target.classList == 'task checked') {
        event.target.classList.remove('checked')
    } else {
        event.target.classList.add('checked')
    }
}

function deleteTask(e) {
    dataBase.remove(e.path[1].id)
    list.removeChild(e.path[2])
}

window.addEventListener('keydown', addTask)
class Expense {
    constructor(year = '', mouth = '', day = '', type = '', description = '', amount = '') {
        this.year = year
        this.mouth = mouth < 10 && mouth.length === 1 ? '0' + mouth : mouth
        this.day = day < 10 && day.length === 1 ? '0' + day : day
        this.type = type
        this.description =
            description === '' ? description : description.replace(description[0], description[0].toUpperCase());
        this.amount = amount
    }

    dataValidate() {
        for (let i in this) {
            if (this[i] === '' || this[i] === undefined || this[i] === null) {
                return false
            }
        }
        return true
    }
}

class DataBase {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getNextId() {
        let nextId = localStorage.getItem('id')
        return parseInt(nextId) + 1
    }

    record(expense) {
        let id = this.getNextId()
        localStorage.setItem(id, JSON.stringify(expense))
        localStorage.setItem('id', id)
    }

    retrieveRecords() {
        let id = localStorage.getItem('id')

        let expenses = Array()

        for (let i = 1; i <= id; i++) {
            let expense = JSON.parse(localStorage.getItem(i))

            if (expense === null) {
                continue
            }
            expense.id = i
            expenses.push(expense)
        }
        return expenses
    }
    search(expense) {
        let filteredExpenses = Array()
        filteredExpenses = this.retrieveRecords()

        if (expense.year != '') {
            filteredExpenses = filteredExpenses.filter(e => e.year === expense.year)
        }
        if (expense.mouth != '') {
            filteredExpenses = filteredExpenses.filter(e => e.mouth === expense.mouth)
        }
        if (expense.day != '') {
            filteredExpenses = filteredExpenses.filter(e => e.day === expense.day)
        }
        if (expense.type != '') {
            filteredExpenses = filteredExpenses.filter(e => e.type === expense.type)
        }
        if (expense.description != '') {
            filteredExpenses = filteredExpenses.filter(e => e.description === expense.description)
        }
        if (expense.amount != '') {
            filteredExpenses = filteredExpenses.filter(e => e.amount === expense.amount)
        }

        return filteredExpenses
    }

    remove(id) {
        localStorage.removeItem(id)
    }
}

const dataBase = new DataBase()

function registerExpense() {
    const year = document.getElementById('year')
    const mouth = document.getElementById('month')
    const day = document.getElementById('day')
    const type = document.getElementById('type')
    const description = document.getElementById('description')
    const amount = document.getElementById('amount')

    if (day.value <= 0 || day.value > 31) {
        return showModal(false)
    }

    const expense = new Expense(year.value, mouth.value, day.value, type.value, description.value.toLowerCase(), amount.value)

    if (expense.dataValidate()) {
        dataBase.record(expense)
        year.value = ''
        mouth.value = ''
        day.value = ''
        type.value = ''
        description.value = ''
        amount.value = ''
        showModal('success')
    } else {
        showModal('error')
    }
}

function showModal(status) {
    const modalHeader = document.querySelector('.modal-header')
    const title = document.querySelector('.modal-title')
    const modalBody = document.querySelector('.modal-body')
    const btnFooter = document.querySelector('#btn-footer')
     

    if (status === 'success') {
        modalHeader.className = 'modal-header text-success'
        title.innerHTML = 'Registro inserido com sucesso'
        modalBody.innerHTML = 'Despesa criada com sucesso.'
        btnFooter.className = 'btn btn-success'
        btnFooter.innerHTML = 'Voltar'
        $('#showModal').modal('show')

    } else if( status === 'error') {
        modalHeader.className = 'modal-header text-danger'
        title.innerHTML = 'Erro na gravação!'
        modalBody.innerHTML = 'Existem campos obrigatórios que não foram preenchidos ou foram preenchidos incorretamentes.'
        btnFooter.className = 'btn btn-danger'
        btnFooter.innerHTML = 'Voltar e corrigir'

        $('#showModal').modal('show')
    } else if(status === 'exclued'){         
        modalHeader.className = 'modal-header text-success'
        title.innerHTML = 'Registro removido com sucesso'
        modalBody.innerHTML = 'Despesa excluída com sucesso.'
        btnFooter.className = 'btn btn-success'
        btnFooter.innerHTML = 'Voltar'
        btnFooter.onclick = () => window.location.reload()
        $('#consultModal').modal('show')       
    }
    
}

function loadingExpenses(expenses = Array(), filter = false) {

    if (expenses.length === 0 && filter === false) {
        expenses = dataBase.retrieveRecords()
    }

    const expensesList = document.getElementById('expensesList')
    expensesList.innerHTML = ''



    expenses.forEach(expense => {
        let row = expensesList.insertRow()
        row.insertCell(0).innerHTML = `${expense.day}/${expense.mouth}/${expense.year}`
        row.insertCell(1).innerHTML = expense.type
        row.insertCell(2).innerHTML = expense.description
        row.insertCell(3).innerHTML = Number(expense.amount).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

        const btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = expense.id
        btn.onclick = function () {
            dataBase.remove(this.id)
            showModal('exclued')
        }
        row.insertCell(4).append(btn)
    })


}


function searchExpenses() {
    const year = document.getElementById('year').value
    const mouth = document.getElementById('mouth').value
    const day = document.getElementById('day').value
    const type = document.getElementById('type').value
    const description = document.getElementById('description').value
    const amount = document.getElementById('amount').value

    const expense = new Expense(year, mouth, day, type, description, amount)

    let filteredExpenses = Array()
    filteredExpenses = dataBase.search(expense)


    loadingExpenses(filteredExpenses, true)

    
}

function totalExpenses() {
    const totalTwentyTwo = dataBase.retrieveRecords().map(({ year, type, amount }) => ({ year, type, amount })).filter(y => y.year === '2022')
    const getTotal = (total, item) => total + Number(item.amount)

    const totAlimentacao = document.getElementById('totAlimentacao').innerHTML = totalTwentyTwo.filter(a => a.type === 'Alimentação').reduce(getTotal,0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    const totEducacao = document.getElementById('totEducacao').innerHTML = totalTwentyTwo.filter(a => a.type === 'Educação').reduce(getTotal,0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    const totLazer = document.getElementById('totLazer').innerHTML = totalTwentyTwo.filter(a => a.type === 'Lazer').reduce(getTotal,0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    const totSaude = document.getElementById('totSaude').innerHTML = totalTwentyTwo.filter(a => a.type === 'Saúde').reduce(getTotal,0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    const totTransporte = document.getElementById('totTransporte').innerHTML = totalTwentyTwo.filter(a => a.type === 'Transporte').reduce(getTotal,0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    const total = document.getElementById('total').innerHTML = totalTwentyTwo.reduce(getTotal,0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

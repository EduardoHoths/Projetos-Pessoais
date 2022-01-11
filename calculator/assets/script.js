const display = document.querySelector('.display')
const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')

let novoNumero = true
let operador
let n1

const operacaoPendente = () => operador !== undefined

const calcular = () => {
    if (operacaoPendente()) {
        const n2 = Number(display.textContent.replace(',', '.'))
        novoNumero = true
        const resultado = eval(`${n1}${operador}${n2}`)
        atualizarDisplay(resultado)
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR')
        novoNumero = false
    } else {
        display.textContent += texto.toLocaleString('BR')
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)

numeros.forEach(numero => numero.addEventListener('click', inserirNumero))

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular()
        novoNumero = true
        operador = evento.target.textContent
        n1 = Number(display.textContent.replace(',','.'))
    }
}

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))

const ativarIgual = () => {
    calcular()
    operador = undefined
    
}
document.getElementById('igual').addEventListener('click', ativarIgual)

const limparDisplay = () => display.textContent = ''

document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

const limparCalculo = () => {
    limparDisplay()
    operador = undefined
    novoNumero = true
    n1 = undefined
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo)

const inserirDecimal = () => {
    if (display.textContent.indexOf(',') === -1) {
        if (display.textContent.length > 0) {
            atualizarDisplay(',')
        } else {
            atualizarDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal)
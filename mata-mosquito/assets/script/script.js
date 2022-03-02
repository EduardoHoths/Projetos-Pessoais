let height = 0
let width = 0
let life = 3
let time = 15
let timerMosquito = 1500

let level = window.location.search.replace('?', '')

if(level === 'easy'){
    timerMosquito = 1500
}else if(level === 'normal'){
    timerMosquito = 1000
}else if(level === 'hard'){
    timerMosquito = 750
} else if(level === 'dark-souls') {
    timerMosquito = 400
}
let timer = setInterval(function(){
    if(time <= 0){
        clearInterval(timer)
        clearInterval(createMosquito)
        window.location.href = 'victory.html?' + level
    } else {
        time--
    document.getElementById('timer').innerHTML = time
    }
    
}, 1000)

function playbleArea() {
    height = window.innerHeight
    width = window.innerWidth
}
playbleArea()

function randomPosition() {

    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (life == 1) {
            window.location.href = 'game-over.html?' + level
            return
        } else {            
            document.getElementById('life' + life).src = '../assets/images/coracao_vazio.png'
            life--
        }

    }

    // create random position
    let positionX = Math.floor(Math.random() * width) - 90
    let positionY = Math.floor(Math.random() * height) - 90

    // control position
    positionX = positionX < 0 ? 0 : positionX
    positionY = positionY < 0 ? 0 : positionY

    // create HTML
    let mosquito = document.createElement('img')
    mosquito.src = '../assets/images/mosquito.png'
    mosquito.className = randomSize() + ' ' + randonSide()
    mosquito.style.left = positionX + 'px'
    mosquito.style.top = positionY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {
        this.remove()
    }

    document.body.appendChild(mosquito)


}
randomPosition()

let createMosquito = setInterval(function () {
    randomPosition()
}, timerMosquito)

function randomSize() {
    let classCss = Math.floor(Math.random() * 3)

    switch (classCss) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function randonSide() {
    let classCss = Math.floor(Math.random() * 2)

    switch (classCss) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
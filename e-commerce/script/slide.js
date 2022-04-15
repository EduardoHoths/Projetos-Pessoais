const slideDiv = document.querySelector('.slide-div')
let index = 0

const slide = () => {
    slideDiv.style.transform = `translateX(-${index * 100}%)`
    if(index === 2){
        index = 0
    } else {
        index++
    }
}

setInterval(slide, 3000)




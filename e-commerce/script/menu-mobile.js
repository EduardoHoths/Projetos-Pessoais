const menuMobile = document.querySelector('.menu-mobile');
const iconMenu = document.querySelector('.icon-menu').addEventListener('click', handleMenu)
const closeMenu = document.querySelector('.close-menu').addEventListener('click', handleMenu)

function handleMenu(){
    if(menuMobile.classList.contains('menu-active')){
        menuMobile.classList.remove('menu-active');
    } else {
        menuMobile.classList.add('menu-active');
    }
}

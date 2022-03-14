let cart = Array()
let totalCart = 0
let pay = 0
let sales = Array()
let totalSales = Array()

const products = document.querySelectorAll('.product')
products.forEach(product => {
    product.onclick = (e) => {
        productOnDisplay(product.id)
        getId(e)
    }
})

function getId(e) {
    const id = e.target.parentNode.id
    const inputQtd = document.getElementById('qtd')
    inputQtd.style.display = 'unset'
    inputQtd.onkeydown = (e) => {
        if (e.key === 'Enter') {
            productOnDisplay(id, inputQtd.value)
            inputQtd.value = ''
        }
    }
}

function addProductOnCart(product, qtd) {
    const objectFiltred = data.filter(el => el.id == product)[0]
    const productFiltred = objectFiltred.product

    for (let i = 0; i <= cart.length; i++) {
        if (cart.length === 0) {
            cart.push({
                product: objectFiltred.product,
                price: objectFiltred.price,
                qtd: 1
            })
            return cart
        }
        if (i === cart.length && cart[i] != productFiltred) {
            cart.push({
                product: objectFiltred.product,
                price: objectFiltred.price,
                qtd: 1
            })
            return cart
        }
        if (cart[i].product == productFiltred) {

            if (qtd > objectFiltred.qtd) {
                alert(`Só temos ${objectFiltred.qtd} unidades disponiveis de ${productFiltred}`)
                break
            }
            if (qtd == 0) {
                if(cart[i].qtd == objectFiltred.qtd){
                    alert(`Só temos ${objectFiltred.qtd} unidades disponiveis de ${productFiltred}`)
                    cart[i].qtd = objectFiltred.qtd
                } else {
                    cart[i].qtd += 1
                }
            } else {
                cart[i].qtd = Number(qtd)
            }
            cart[i].price = cart[i].qtd * objectFiltred.price
            return cart
        }
    }
}
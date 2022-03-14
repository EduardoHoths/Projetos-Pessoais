const resume = document.getElementById('resume')
const menu = document.getElementById('menu')
const totalValuePurchase = document.getElementById('totalValuePurchase')
const divTotal = document.getElementById('total')
const h1 = document.querySelector('h1')
const infoPurchasePurchase = document.getElementById('infoPurchase')
const panel = document.getElementById('panel')
const totalSalesArea = document.getElementById('totalSalesArea')

function productOnDisplay(product, qtd = 0) {
    const payment = document.getElementById('payment')
    payment.addEventListener('keypress', paymentScreen)
    menu.style.display = 'none'
    panel.style.display = 'flex'
    resume.style.display = 'unset'
    divTotal.style.display = 'flex'

    resume.innerHTML = ''

    h1.innerHTML = 'RESUMO DA COMPRA'

    const updatedCart = addProductOnCart(product, qtd)

    totalCart = 0
    updatedCart.forEach(el => {

        totalCart += el.price

        const productName = document.createElement('p')
        const qtd = document.createElement('p')
        const price = document.createElement('p')
        const div = document.createElement('div')

        div.classList = 'cart'
        productName.innerHTML = el.product
        qtd.innerHTML = `${el.qtd} UN`
        price.innerHTML = el.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        div.appendChild(productName)
        div.appendChild(qtd)
        div.appendChild(price)

        resume.appendChild(div)
    })
    payment.removeAttribute('disabled')
    payment.style.opacity = 1
    totalValuePurchase.innerHTML = totalCart.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
function disableOrActiveMenuProducts(status){

    if(status == 'active'){
        products.forEach(product => {
            if (product.className != 'product disabled') {
                product.removeAttribute('disabled')
            }
        })
    } else {
        products.forEach(product => {
            product.setAttribute('disabled', 'disabled')
        })
    }
    
}
function paymentScreen(e) {
    if (e.key != 'Enter') {
        return
    }
    disableOrActiveMenuProducts('disable')
    resume.innerHTML = ''

    pay += Number(e.target.value)
    e.target.value = ''
    createResumeScreen(pay)

    if (pay >= totalCart) {
        infoPurchase.innerHTML = 'TROCO'
        totalValuePurchase.innerHTML = (pay - totalCart).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        setTimeout(closingScreen, 2500)
    } else {
        infoPurchase.style.fontSize = '0.8em'
        infoPurchase.innerHTML = 'VALOR RESTANTE A PAGAR'
        totalValuePurchase.innerHTML = (totalCart - pay).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
}

function createResumeScreen(money) {
    const divTotal = document.createElement('div')
    const totalPayable = document.createElement('h3')
    const amount = document.createElement('p')
    const divMoney = document.createElement('div')
    const paragraphMoney = document.createElement('p')
    const paragraphValue = document.createElement('p')

    totalPayable.innerHTML = 'Total a pagar'
    amount.innerHTML = totalCart.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    paragraphMoney.innerHTML = 'Dinheiro'
    paragraphValue.innerHTML = Number(money).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    divTotal.classList = 'payment-area'
    divMoney.classList = 'payment-area'

    divTotal.appendChild(totalPayable)
    divTotal.appendChild(amount)
    divMoney.appendChild(paragraphMoney)
    divMoney.appendChild(paragraphValue)

    resume.appendChild(divTotal)
    resume.appendChild(divMoney)
}

function closingScreen() {
    document.getElementById('payment').setAttribute('disabled', 'disabled')
    document.getElementById('payment').style.opacity = '0.8'
    document.getElementById('qtd').style.display = 'none'

    resume.style.display = 'none'
    divTotal.style.display = 'none'
    h1.innerHTML = 'Obrigado, volte sempre!'

    cart.forEach(sale => {
        sales.push({
            product: sale.product,
            price: sale.price,
            qtd: sale.qtd
        })
    })
    updateStock(cart)
    updateSales()
    setTimeout(() => {
        panel.style.display = 'none'
        menu.style.display = 'flex'
        disableOrActiveMenuProducts('active')        
        h1.innerHTML = ''
    }, 3000)

    cart = Array()
    pay = 0
    totalCart = 0
}


function checkStock() {
    const menu = document.getElementById('menu')
    menu.style.display = 'none'
    panel.style.display = 'flex'
    const stock = document.querySelector('#stock')
    disableOrActiveMenuProducts('disable')

    data.forEach(e => {
        const div = document.createElement('div')
        const product = document.createElement('p')
        const qtd = document.createElement('p')

        product.innerHTML = e.product
        qtd.innerHTML = `${e.qtd} UN`
        div.classList = 'stock'

        div.appendChild(product)
        div.appendChild(qtd)

        stock.appendChild(div)
    })
    const button = backToHomeScreen(stock)
    stock.appendChild(button)
}

function backToHomeScreen(div) {
    const button = document.createElement('button')
    button.innerHTML = 'Voltar a tela inicial'
    button.classList = 'back'
    button.onclick = function () {
        div.innerHTML = ''
        menu.style.display = 'flex'
        panel.style.display = 'none'
        totalSalesArea.style.display = 'none'
        disableOrActiveMenuProducts('active')
    }
    return button
}
function showTotalSales() {
    /* Implementação futura de um modal */
    if (totalSales.length === 0) {
        alert('Nenhuma venda efetuada')
        return
    }
    disableOrActiveMenuProducts('disable')
    totalSalesArea.style.display = 'unset'
    menu.style.display = 'none'
    panel.style.display = 'flex'
    const salesDetails = document.getElementById('salesDetails')

    salesDetails.innerHTML = ''

    
    if(!document.querySelector('.back')){
        const button = backToHomeScreen(sales)
        totalSalesArea.appendChild(button)
    }
    

    totalSales.forEach(el => {
        const div = document.createElement('div')
        const product = document.createElement('p')
        const qtd = document.createElement('p')
        const amount = document.createElement('p')

        div.classList = 'cart'
        product.innerHTML = el.product
        qtd.innerHTML = `${el.qtd} UN`
        amount.innerHTML = el.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        div.appendChild(product)
        div.appendChild(qtd)
        div.appendChild(amount)
        salesDetails.appendChild(div)
    })
    const totalValueSales = document.getElementById('totalValueSales')
    totalValueSales.innerHTML = totalSales.reduce((acc, item) => acc + item.price, 0).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}
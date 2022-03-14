const data = [
    {
        product: 'Fanta Laranja',
        qtd: 15,
        price: 5,
        id: 4
    },
    {
        product: 'Coca Cola',
        qtd: 30,
        price: 6,
        id: 1
    },
    {
        product: 'Coca Cola Zero',
        qtd: 10,
        price: 6.50,
        id: 2
    },
    {
        product: 'Del Vale Uva',
        qtd: 5,
        price: 4.50,
        id: 3
    },
    {
        product: 'Guarana Antártica',
        qtd: 14,
        price: 5.50,
        id: 5
    },
    {
        product: 'Schwepps',
        qtd: 4,
        price: 5.80,
        id: 6
    },
    {
        product: 'Schwepps Tonica',
        qtd: 20,
        price: 6,
        id: 8
    },
    {
        product: 'Sprite',
        qtd: 10,
        price: 4.99,
        id: 7
    }
]

function updateStock(cart){
    cart.forEach(el => {
        for(let i in data){
            if(el.product == data[i].product){
                data[i].qtd -= el.qtd
            }
        }
    })
    data.forEach(el => {
        if(el.qtd === 0){
            document.getElementById(el.id).classList.add('disabled')
        }
    })
}

function updateSales(){
    
    sales.forEach(el => {
        
        for (let i = 0; i <= sales.length; i++) {
            console.log(el, i);
            if (totalSales.length === 0) {
                totalSales.push({
                    product: el.product,
                    price: el.price,
                    qtd: el.qtd
                })
                console.log('TotalSales é igual a zero');
                return
            }      
            if(i == sales.length){
                totalSales.push({
                    product: el.product,
                    price: el.price,
                    qtd: el.qtd
                })
                return
            }
            if(el.product == totalSales[i].product){
                totalSales[i].price += el.price
                totalSales[i].qtd += el.qtd
                console.log('esse produto existe em totalSales');
                return
            }
            
        }
    })
    console.log(totalSales);
    sales = Array()
}
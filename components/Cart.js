

function Cart(cartArr){
    const container = document.createElement('div')
    container.setAttribute('id', 'wrap-cart')
    if(cartArr.length){

        const cartList = CartProducts(cartArr)
        const cartOrder = OrderForm(cartArr)
        container.append(cartList, cartOrder)
    }else{
        const emptyCart = document.createElement('div')
        emptyCart.innerHTML = '<h1>Ваша Корзина Пуста!</h1>'
        container.append(emptyCart)
    }

    return container


}

function OrderForm(cart){
    const divWrap = document.createElement('div')
    divWrap.setAttribute('id', 'order-cart')
    const divAll = document.createElement('div')
    const divDiscount = document.createElement('div')
    const divTotal = document.createElement('div')
    const pAll = document.createElement('p')
    const pDiscount = document.createElement('p')
    const pTotal = document.createElement('p')
    const pValAll = document.createElement('p')
    const pValDiscount = document.createElement('p')
    const pValTotal = document.createElement('p')

    var totalCost = 0

    for(let t=0; t<cart.length; t++){
        totalCost += (cart[t].product.price * cart[t].quantity)
    }
    pValAll.innerText = totalCost + ' сум'
    pValDiscount.innerText = '0'
    pValTotal.innerText = totalCost + ' сум'
    pAll.innerText = 'Всего'
    pDiscount.innerText = 'Скидка'
    pTotal.innerText = 'Итого к оплате'
    divAll.append(pAll, pValAll)
    divDiscount.append(pDiscount, pValDiscount)
    divTotal.append(pTotal, pValTotal)
    divWrap.append(divAll, divDiscount, divTotal)

    return divWrap

}


function CartProducts(cartArr){
    const ul = document.createElement('ul')

    for(let b=0; b<cartArr.length; b++){
        const li = document.createElement('li')
        const divImg = document.createElement('div')
        divImg.className = 'picture-div'
        const img = document.createElement('img')
        const divInfo = document.createElement('div')
        divInfo.className = 'info-div'
        const p = document.createElement('p')
        const divQuantity = document.createElement('div')
        divQuantity.className = 'cart-quantity'
        const buttonAdd = document.createElement('button')
        const buttonSub = document.createElement('button')
        const spanValue = document.createElement('span')
        const pCost = document.createElement('p')
        const divCost = document.createElement('div')
        divCost.className = 'div-cost'
        const buttonDelete = document.createElement('button')

        img.setAttribute('src', cartArr[b].product.img)
        p.innerText = cartArr[b].product.title
        buttonAdd.innerText = '+'
        buttonSub.innerText = '-'
        spanValue.innerText = cartArr[b].quantity
        pCost.innerText = cartArr[b].product.price + ' сум'
        buttonDelete.innerText = 'Delete'
        buttonDelete.setAttribute('data-id', cartArr[b].product.id)
        buttonAdd.setAttribute('data-id', cartArr[b].product.id)
        buttonSub.setAttribute('data-id', cartArr[b].product.id)

        buttonAdd.onclick = function(e){
            const id = e.target.getAttribute('data-id')
            const quantityVal = quantity('+', cartArr[b].quantity)
            for(let r=0; r<cart.length; r++){
                if(cart[r].product.id===Number(id)){
                    cart[r].quantity = quantityVal
                }
            }

            spanValue.innerHTML = quantityVal
            document.getElementById('order-cart').replaceWith(OrderForm(cart))

        }

        buttonSub.onclick = function(e){
            const id = e.target.getAttribute('data-id')
            const quantityVal = quantity('-', cartArr[b].quantity)
            for(let r=0; r<cart.length; r++){
                if(cart[r].product.id===Number(id)){
                    cart[r].quantity = quantityVal
                }
            }

            spanValue.innerHTML = quantityVal
            document.getElementById('order-cart').replaceWith(OrderForm(cart))

        }

        buttonDelete.onclick = function(e){
            const id = e.target.getAttribute('data-id')
            let newCart = []
            for(let r=0; r<cart.length; r++){
                if(cart[r].product.id!==Number(id)){
                    newCart.push(cart[r])
                    console.log(id +" "+cart[r].product.id)
                }
            }

            cart =  newCart
            document.getElementById('app').replaceChild(Cart(cart), document.getElementById('wrap-cart'))

        }


        divImg.append(img)
        divInfo.append(p)
        divQuantity.append(buttonSub, spanValue, buttonAdd)
        divInfo.append(divQuantity,divQuantity)
        divCost.append(pCost,buttonDelete)
        li.append(divImg,divInfo,divCost)

        ul.append(li)

    }

    return ul
}

function quantity(event='', quantity){
    if(event==='+'){
        return quantity+1
    }else if(event==='-'){
        if(quantity>1){
            return quantity-1
        }
    }

    return quantity
}
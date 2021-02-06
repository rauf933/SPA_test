var cart = []
const app = document.getElementById('app')


window.onload = function(){

    const productsHtml = document.createElement('div')
    productsHtml.setAttribute('id', 'home-products')
    productsHtml.append(Products(products))
    const header = Header()

    app.append(header,productsHtml)




}


function Header(){

    const header = document.createElement('header')
    const div = document.createElement('div')
    const divImg = document.createElement('div')
    const button = document.createElement('button')
    const img = document.createElement('img')

    img.setAttribute('src', 'images/shopping-cart.svg')
    button.setAttribute('id', 'button-cart')

    button.addEventListener('click', function(){
        const mainContainer = document.getElementById('home-products')
        mainContainer.replaceWith(Cart(cart))
    })


    divImg.append(img)
    button.append(divImg)
    div.append(button)
    header.append(div)
    return header
}

function Products(arrProducts){
    const ul = document.createElement('ul')
    for(let i=0; i<arrProducts.length; i++){

        const li = document.createElement('li')
        const divImg = document.createElement('div')
        const divInfo = document.createElement('div')
        const img = document.createElement('img')
        const p = document.createElement('p')
        const h3 = document.createElement('h3')
        const button = document.createElement('button')

        divImg.setAttribute('class', 'picture-product')
        img.setAttribute('src', arrProducts[i].img)
        button.setAttribute('data-id', arrProducts[i].id)
        p.innerText = arrProducts[i].price
        h3.innerText = arrProducts[i].title
        button.innerText = 'add to cart'

        button.addEventListener('click', function(e){
            const id = e.target.getAttribute('data-id')
            AddToCart(Number(id))
            alert('Товар добавлен в корзину')
        })

        divImg.append(img)
        divInfo.append(p,h3,button)
        li.append(divImg, divInfo)

        ul.append(li)
    }
    return ul
}

function AddToCart(id){
    for(let k =0; k<products.length; k++){
        if(products[k].id===id){
            const objectCart = {
                product: products[k],
                quantity: 1
            }
            cart.push(objectCart)
        }
    }

}
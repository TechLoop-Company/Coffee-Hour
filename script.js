
let carts= document.querySelectorAll('.add-cart');
let products = [
    {
        name: "Mocha Frappe",
        tag: "mocha",
        price: 120,
        inCart: 0
    },
    {
        name: "Matcha Frappe",
        tag: "matcha",
        price: 130,
        inCart: 0
    },
    {
        name: "Strawberry Frappe",
        tag: "strawberry",
        price: 100,
        inCart: 0
    }
];

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action){ 
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    
    let cartItems =localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action){
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent= productNumbers - 1;
    } else if(productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;

        if(cartItems[currentProduct] == undefined){
            cartItems ={
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1; 
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        } 
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cart = localStorage.getItem("totalCost");

    if(cart != null){
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cart = localStorage.getItem("totalCost"); 
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">  
                <img class="close" src="images/cancel.png">
                <img src="./basics/${item.tag}.jpg">
                <span>${item.name}</span>
                <div class="price">₱${item.price}.00</div>
                <div class="quantity">
                <img class="decrease" src="images/minus.png">
                <span>${item.inCart}</span>
                <img class "increase" src="images/plus.png">
                </div>
                <div class="total">
                ₱${item.inCart * item.price}.00
                </div>
            </div>
            `;
        });
        productContainer.innerHTML += `
            <div class="basketTotal">
            <h4 class="basketTotalTitle">Total Amount:</h4>
            <h4 class="totalBaket">
            ₱${cart}.00
            </h4>
            </div>`
            
         manageQuantity();
         deleteBtn();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').
            textContent.toLocaleLowerCase().replace(/ /g,'').trim();

            if(cartItems[currentProduct].inCart > 1){
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').
            textContent.toLocaleLowerCase().replace(/ /g,'').trim();

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }

}

function deleteBtn(){
    let deleteBtn = document.querySelectorAll('.products .close');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;

    for(let i=0; i < deleteBtn.length; i++){
        deleteBtn[i].addEventListener('click', () => {
            productName = deleteBtn[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        });
    }
}
onLoadCartNumbers();
displayCart();

document.getElementById('order').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display = 'flex';
});
document.querySelector('.cls').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display ='none';
});


document.getElementById('pickup').addEventListener('click', function(){
    document.querySelector('.pick').style.display= 'flex';
});
document.getElementById('pickup').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display= 'none';
});
document.querySelector('.cls2').addEventListener('click', function(){
    document.querySelector('.pick').style.display = 'none';
});


document.getElementById('ok').addEventListener('click', function(){
    document.querySelector('.proceed').style.display = 'flex';
});
document.getElementById('ok').addEventListener('click', function(){
    document.querySelector('.pick').style.display = 'none';
});

document.querySelector('.cls3').addEventListener('click', function(){
    document.querySelector('.proceed').style.display = 'none';
});

//deliver//
document.getElementById('deliver').addEventListener('click', function(){
    document.querySelector('.delivery').style.display = 'flex';
});
document.querySelector('.cls4').addEventListener('click', function(){
    document.querySelector('.delivery').style.display ='none';
});
//....//
document.getElementById('deliver').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display = 'none';
});
//...//
document.getElementById('checkout').addEventListener('click', function(){
    document.querySelector('.proceed').style.display = 'flex';
});
document.getElementById('checkout').addEventListener('click', function(){
    document.querySelector('.delivery').style.display = 'none';
});

document.getElementById('add').addEventListener('click', function(){
    document.querySelector('.pop').style.display = 'flex';
});
document.querySelector('.cls6').addEventListener('click', function(){
    document.querySelector('.pop').style.display = 'none';
});


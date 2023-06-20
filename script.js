import { dishes } from "./dishes_data.js"

const createComponent = (dish) => {
    return `<div  
            class="card" 
            style="width: 18rem;">
        <img src="${dish.picture}" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">${dish.name}</p>
            <button type="button" data-product-id="${dish.id}" class="btn btn-primary addTocart">Add to cart</button>
        </div>
        </div>`
}

const render = (container) => {
    // Remove existing cards
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    dishes.map(dish => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = createComponent(dish)
        container.appendChild(card)
    })
}

// STORAGE SESSION
const setCart = cart => sessionStorage.setItem("cart", JSON.stringify(cart))

const getTotal = () => 60

// Save data to sessionStorage
const addToCart = (id) => {
    let dish = dishes[id]
    console.log(dish);
    sessionStorage.setItem("cart", JSON.stringify(dishes[id]));
    if (dish) {
        const cartItem = document.createElement("li");
        cartItem.textContent = `${dish.name} - ${dish.price}€`;
        document.getElementById("shoppingCart").appendChild(cartItem);
        document.getElementById("totalPrice").textContent = `Total: ${getTotal()}€`;
    }
}

const reload = callback => { callback(); window.location.href = './index.html' }

// Get saved data from sessionStorage
// let data = sessionStorage.getItem("cart");
// console.log(JSON.parse(data));


// Remove saved data from sessionStorage
// sessionStorage.removeItem("kitchen");

// Remove all saved data from sessionStorage
// sessionStorage.clear();


// LAUNCH
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault()
    let container = document.querySelector(".container-fluid")
    if (container) {
        render(container)
    }
    // Add event listener to dynamically created buttons
    const addToCartButtons = document.getElementsByClassName("addTocart");
    Array.from(addToCartButtons).forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.dataset.productId);
            addToCart(productId);
        });
    });
})


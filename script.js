let quantity = 1;
let cart = [];
let stock = { "Chair": 10 }; // Stock inventory

// Загрузка данных из LocalStorage
window.onload = function () {
    const savedCart = localStorage.getItem("cart");
    const savedStock = localStorage.getItem("stock");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (savedStock) {
        stock = JSON.parse(savedStock);
    }

    updateCartCount();
    updateAllStockDisplays();
};

// Сохранение данных в LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("stock", JSON.stringify(stock));
}

function changeQuantity(change) {
    quantity = Math.max(1, quantity + change);
    document.getElementById("quantity").textContent = quantity;
}

function addToCart(name, price, image) {
    if (stock[name] < quantity) {
        alert("Not enough stock available!");
        return;
    }

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity, image });
    }

    stock[name] -= quantity;
    updateStockDisplay(name);
    updateCartCount();
    calculateTotal();
    saveToLocalStorage(); // Сохранение состояния
}

function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalCount;
}

function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("cart-total").textContent = `Total: $${total}`;
}

function toggleCartModal() {
    const modal = document.getElementById("cart-modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
    renderCartItems();
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            ${item.name} - $${item.price} x ${item.quantity}
            <div>
                <button onclick="changeCartItemQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeCartItemQuantity(${index}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(li);
    });

    calculateTotal();
}

function changeCartItemQuantity(index, change) {
    const item = cart[index];
    if (change < 0 && item.quantity === 1) {
        stock[item.name] += 1;
        cart.splice(index, 1);
    } else {
        item.quantity += change;

        if (item.quantity <= 0) {
            stock[item.name] += Math.abs(change);
            cart.splice(index, 1);
        } else {
            stock[item.name] -= change;
        }
    }

    updateStockDisplay(item.name);
    updateCartCount();
    renderCartItems();
    saveToLocalStorage(); // Сохранение состояния
}

function updateStockDisplay(name) {
    const stockDisplay = document.getElementById(`${name}-stock`);
    if (stockDisplay) {
        stockDisplay.textContent = `In stock: ${stock[name]}`;
    }
}

function updateAllStockDisplays() {
    for (const name in stock) {
        updateStockDisplay(name);
    }
}
function calculatePageTotal() {
    const products = document.querySelectorAll('.product');
    let totalValue = 0;

    products.forEach(product => {
        const priceText = product.querySelector('.product-info h3').textContent;
        const price = parseFloat(priceText.replace('Sale price: $', ''));
        const stockText = product.querySelector(`#${product.querySelector('.product-info').id}-stock`).textContent;
        const stock = parseInt(stockText.replace('In stock: ', ''));

        totalValue += price * stock;
    });

    console.log(`Total value of all products on the page: $${totalValue.toFixed(2)}`);
    return totalValue;
}

// Запускаем расчет сразу при загрузке страницы.
document.addEventListener('DOMContentLoaded', () => {
    const totalValue = calculatePageTotal();
    alert(`Общая стоимость всех товаров на странице: $${totalValue.toFixed(2)}`);
});


// Function to update and display the total stock value
function updateTotalStockValue() {
    let totalValue = 0;
    for (const item in stock) {
        totalValue += stock[item] * 280; // Assume $280 per unit for simplicity
    }
    document.getElementById("total-stock-value").textContent = `Total stock value: $${totalValue}`;
}

// Call updateTotalStockValue on page load and after each stock change
window.onload = function () {
    const savedCart = localStorage.getItem("cart");
    const savedStock = localStorage.getItem("stock");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (savedStock) {
        stock = JSON.parse(savedStock);
    }

    updateCartCount();
    updateAllStockDisplays();
    updateTotalStockValue(); // Initial calculation of total stock value
};

// Modify updateStockDisplay to also update total stock value
function updateStockDisplay(name) {
    const stockDisplay = document.getElementById(`${name}-stock`);
    if (stockDisplay) {
        stockDisplay.textContent = `In stock: ${stock[name]}`;
    }
    updateTotalStockValue(); // Update the total stock value whenever stock changes
}

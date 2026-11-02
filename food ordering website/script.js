
// Food items

const foods = [
    {
        id: 1,
        name: "Classic Beef Burger",
        cat: "Burgers",
        price: 850,
        desc: "Juicy beef patty, cheese, lettuce and house sauce.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&q=80"
    },
    {
        id: 2,
        name: "Crispy Chicken Burger",
        cat: "Burgers",
        price: 720,
        desc: "Golden crispy chicken with fresh slaw and mayo.",
        img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=700&q=80"
    },
    {
        id: 3,
        name: "Pepperoni Pizza",
        cat: "Pizza",
        price: 1450,
        desc: "Classic cheesy pizza topped with pepperoni.",
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=700&q=80"
    },
    {
        id: 4,
        name: "Margherita Pizza",
        cat: "Pizza",
        price: 1250,
        desc: "Tomato, mozzarella, basil and a crisp crust.",
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&q=80"
    },
    {
        id: 5,
        name: "Loaded Fries",
        cat: "Sides",
        price: 490,
        desc: "Crispy fries with cheese, herbs and special sauce.",
        img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&q=80"
    },
    {
        id: 6,
        name: "Chicken Wings",
        cat: "Sides",
        price: 680,
        desc: "Tender wings tossed in a smoky spicy glaze.",
        img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=700&q=80"
    },
    {
        id: 7,
        name: "Chocolate Shake",
        cat: "Drinks",
        price: 420,
        desc: "Rich chocolate milkshake, served chilled.",
        img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&q=80"
    },
    {
        id: 8,
        name: "Fresh Lemonade",
        cat: "Drinks",
        price: 250,
        desc: "Fresh lemon, mint and a little sparkle.",
        img: "https://images.unsplash.com/photo-1513558161293-cantae9f7b1f?w=700&q=80"
    },
    {
        id: 9,
        name: "Chocolate Brownie",
        cat: "Desserts",
        price: 390,
        desc: "Warm chocolate brownie with a soft centre.",
        img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&q=80"
    }
];

let category = "All";
let cart = {};

const categories = [
    "All", "Burgers", "Pizza", "Sides", "Drinks", "Desserts"
];

// Display categories

function renderCategories() {
    let output = "";

    categories.forEach(function(c) {
        output += `
            <button class="chip ${category === c ? "active" : ""}"
                onclick="setCategory('${c}')">
                ${c}
            </button>
        `;
    });

    document.getElementById("categories").innerHTML = output;
}

// Select category

function setCategory(c) {
    category = c;
    renderCategories();
    renderMenu();
}

// Display food items

function renderMenu() {
    let query = document.getElementById("food-search").value.toLowerCase();

    let list = foods.filter(function(food) {
        let matchCategory = category === "All" || food.cat === category;

        let matchSearch =
            food.name.toLowerCase().includes(query) ||
            food.desc.toLowerCase().includes(query);

        return matchCategory && matchSearch;
    });

    let output = "";

    list.forEach(function(food) {
        output += `
            <div class="food-card">
                <img src="${food.img}" alt="${food.name}" loading="lazy">

                <div class="food-info">
                    <h3>${food.name}</h3>
                    <p>${food.desc}</p>

                    <div class="food-bottom">
                        <span class="price">
                            Rs. ${food.price.toLocaleString("en-PK")}
                        </span>

                        <button class="add" onclick="addItem(${food.id})">
                            +
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    if (list.length === 0) {
        output = "<p>No food found.</p>";
    }

    document.getElementById("menu-grid").innerHTML = output;
}

// Add food to cart

function addItem(id) {
    if (cart[id]) {
        cart[id]++;
    } else {
        cart[id] = 1;
    }

    renderCart();
}

// Change quantity

function changeQty(id, amount) {
    cart[id] += amount;

    if (cart[id] <= 0) {
        delete cart[id];
    }

    renderCart();
}

// Display cart

function renderCart() {
    let items = Object.entries(cart);

    let count = 0;
    let total = 0;
    let output = "";

    items.forEach(function(item) {
        let id = item[0];
        let quantity = item[1];

        let food = foods.find(function(f) {
            return f.id == id;
        });

        count += quantity;
        total += food.price * quantity;

        output += `
            <div class="cart-line">
                <div>
                    <strong>${food.name}</strong>
                    <div class="price">
                        Rs. ${(food.price * quantity).toLocaleString("en-PK")}
                    </div>
                </div>

                <div class="qty">
                    <button onclick="changeQty(${id}, -1)">−</button>
                    ${quantity}
                    <button onclick="changeQty(${id}, 1)">+</button>
                </div>
            </div>
        `;
    });

    if (items.length === 0) {
        output = '<div class="empty">Your basket is empty.</div>';
    }

    document.getElementById("cart-items").innerHTML = output;
    document.getElementById("cart-count").innerHTML = count;

    document.getElementById("cart-total").innerHTML =
        "Rs. " + total.toLocaleString("en-PK");
}

// Open cart

function openCart() {
    document.getElementById("overlay").classList.add("show");
}

// Close cart

function closeCart() {
    document.getElementById("overlay").classList.remove("show");
}

// Close when clicking outside

function closeOutside(event) {
    if (event.target.id === "overlay") {
        closeCart();
    }
}

// Checkout

document.getElementById("checkout").addEventListener("submit", function(event) {
    event.preventDefault();

    if (Object.keys(cart).length === 0) {
        alert("Please add food to your cart first.");
        return;
    }

    let name = document.getElementById("customer-name").value;

    alert("Thank you, " + name + "! Your demo order has been received.");

    cart = {};

    renderCart();

    document.getElementById("checkout").reset();

    closeCart();
});

// Search food

document.getElementById("food-search").addEventListener("input", function() {
    renderMenu();
});

// Start website

renderCategories();
renderMenu();
renderCart();

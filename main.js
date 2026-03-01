const booksSection=document.getElementById("booksSection");
const cartSection=document.getElementById("cartSection");
const checkoutSection=document.getElementById("checkoutSection");
const checkoutBtn=document.getElementById("checkoutBtn");
const booksContainer = document.getElementById("booksContainer");
const cartBtn = document.getElementById("cartBtn");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

let cart = [];


async function fetchBooks()
{
    const response = await fetch("https://api.itbook.store/1.0/search/mongodb");
    const data = await response.json();
    displayBooks(data.books);
}

fetchBooks();


function displayBooks(books)
{
    booksContainer.innerHTML = "";

    books.forEach(book => 
        {
            const div = document.createElement("div");
            div.classList.add("book");

            div.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.subtitle}</p>
            <p>${book.price}</p>
            <button>Add to Cart</button>`;

            div.querySelector("button").addEventListener("click", () => {
                addToCart(book);
            });

            booksContainer.appendChild(div);
        });
}


function addToCart(book)
{
    cart.push(book);
    updateCart();
}


function updateCart()
{
    cartItems.innerHTML = "";
    let total = 0;

    if(cart.length === 0)//If cart is Empty
    {
        cartItems.innerHTML = `<p class="empty-cart">Cart is empty 🛒</p>`;
        totalPrice.textContent = "Total: $0";
        cartBtn.textContent = "Cart (0)";
        return; 
    }

    cart.forEach((item,index) => {

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="cart-item">
                <span>${item.title} - ${item.price}</span>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        div.querySelector("button").addEventListener("click", () => {
            cart.splice(index,1);
            updateCart();
        });

        cartItems.appendChild(div);

        let price = item.price.replace("$","");
        total += Number(price);
    });

    totalPrice.textContent = "Total: $" + total;
    cartBtn.textContent = `Cart (${cart.length})`;
}


function showSection(section)
{
    booksSection.classList.add("hidden");
    cartSection.classList.add("hidden");
    checkoutSection.classList.add("hidden");

    section.classList.remove("hidden");
}

cartBtn.addEventListener("click",()=>{
    showSection(cartSection);
});


checkoutBtn.addEventListener("click",()=>{
    cart = [];
    updateCart();
    showSection(checkoutSection);
});

const backBtn=document.getElementById("backBtn");

backBtn.addEventListener("click",()=>{
    showSection(booksSection);
});













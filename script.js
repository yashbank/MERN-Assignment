
const books = [
    { id: 1, name: "Ulysses", author: "James Joyce", price: 19.99, image: "https://thegreatestbooks.club/9vecj2fz5246xa3c5c7slr4y7kyl" },
    { id: 2, name: "In Search of Lost Time", author: "Marcel Proust", price: 29.99, image: "https://thegreatestbooks.club/sg0ytun7phyv9c4q5772nqvgjpyb" },
    { id: 3, name: "One Hundred Years of Solitude", author: "Gabriel Garcia Marquez", price: 14.99, image: "https://thegreatestbooks.club/nkfaeq8vlliz3jbdkt38km3w7jr5" },
    { id: 4, name: "Don Quixote  ", author: "Miguel de Cervantes", price: 9.99, image: "https://thegreatestbooks.club/bbv4hn6u3743cf28g76ajvkrgrvn" },
    { id: 5, name: "The Great Gatsby  ", author: "F. Scott Fitzgerald", price: 79.99, image: "https://thegreatestbooks.club/xqzw71cq0cfn1s0ganth5b7x09ec" },
    { id: 6, name: "Moby Dick  ", author: "Herman Melville", price: 44.99, image: "https://thegreatestbooks.club/5ntsznzrzuoakqhhbxi9phqhmkgt" },
    { id: 7, name: "War and Peace  ", author: " Leo Tolstoy", price: 19.99, image: "https://thegreatestbooks.club/l0d079mbda8c8ivtito38pljjfk2" },
    { id: 8, name: "Alice's Adventures in Wonderland  ", author: "Lewis Carroll", price: 79.99, image: "https://thegreatestbooks.club/ghd98em6a7n2ydnmmzwpyww6o54o" },
    { id: 9, name: " The Divine Comedy ", author: "Dante Alighieri", price: 34.99, image: "https://thegreatestbooks.club/gaxujpxd6hprs13s980kb2s0tffj" },

];




const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },

];


let cart = [];


function displayBooks() {
    const booksSection = document.querySelector('.books-section');
    booksSection.innerHTML = '';

    books.forEach((book) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.image}" alt="${book.name}">
            <div>${book.name}</div>
            <div>Author: ${book.author}</div>
            <div>Price: $${book.price}</div>
            <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
        `;

        card.querySelector('.add-to-cart').addEventListener('click', addToCart);
        booksSection.appendChild(card);
    });
}


function addToCart(event) {
    const bookId = parseInt(event.target.dataset.id);
    const selectedBook = books.find((book) => book.id === bookId);

    if (selectedBook) {
        cart.push(selectedBook);
        updateCart();
    }
}


function updateCart() {
    const cartSection = document.querySelector('.cart-section');
    cartSection.innerHTML = '';

    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>${item.name} - $${item.price}</div>
            <button class="delete-item" data-id="${item.id}">Delete</button>
        `;

        cartItem.querySelector('.delete-item').addEventListener('click', deleteCartItem);
        cartSection.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    cartSection.innerHTML += `<div>Total: $${totalPrice}</div>`;
}


function deleteCartItem(event) {
    const bookId = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== bookId);
    updateCart();
}


displayBooks();
updateCart();


document.getElementById('loginBtn').addEventListener('click', () => showModal('loginModal'));
document.getElementById('signupBtn').addEventListener('click', () => showModal('signupModal'));


document.addEventListener('click', (event) => {
    if (event.target.className === 'modal') {
        closeModals();
    }
});


document.getElementById('loginSubmit').addEventListener('click', login);


document.getElementById('signupSubmit').addEventListener('click', signup);


let lastActivity = Date.now();

function checkInactivity() {
    const currentTime = Date.now();
    const inactiveTime = currentTime - lastActivity;

    if (inactiveTime > 5 * 24 * 60 * 60 * 1000) {

        alert('You have been inactive for more than 5 days. Please log in again.');

    }

    lastActivity = currentTime;
}


document.addEventListener('mousemove', checkInactivity);
document.addEventListener('keydown', checkInactivity);


function showNotification(message) {

    alert(message);
}


function notifyInactiveCheckoutUsers() {

    const isCheckoutPage = window.location.href.includes('checkout');

    if (isCheckoutPage && cart.length > 0) {
        const hasInactiveCheckoutUsers = cart.some((item) => !item.purchased);
        if (hasInactiveCheckoutUsers) {
            showNotification('Reminder: You have items in your cart. Complete your purchase!');
        }
    }
}


document.addEventListener('DOMContentLoaded', notifyInactiveCheckoutUsers);


function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
}


function closeModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => (modal.style.display = 'none'));
}


function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;


    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        closeModals();
        alert('Login successful!');

    } else {
        alert('Invalid username or password');
    }
}


function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Check if the username is already taken
    const existingUser = users.find((u) => u.username === username);

    if (!existingUser) {
        users.push({ username, password });
        closeModals();
        alert('Signup successful! You can now login.');
    } else {
        alert('Username already taken. Please choose another.');
    }
}

function updateCart() {
    const cartSection = document.querySelector('.cart-section');
    cartSection.innerHTML = '';

    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>${item.name} - $${item.price}</div>
            <button class="delete-item" data-id="${item.id}">Delete</button>
        `;

        cartItem.querySelector('.delete-item').addEventListener('click', deleteCartItem);
        cartSection.appendChild(cartItem);
    });

    // Calculate and display total price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    cartSection.innerHTML += `<div>Total: $${totalPrice}</div>`;
}

// Function to delete a book from the cart
function deleteCartItem(event) {
    const bookId = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== bookId);
    updateCart();
}


document.querySelector('.cart-section').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-item')) {
        const bookId = parseInt(event.target.dataset.id);
        cart = cart.filter((item) => item.id !== bookId);
        updateCart();
    }
});



console.log(lastActivity)



const isCheckoutPage = window.location.href.includes('checkout');

if (isCheckoutPage && cart.length > 0) {
    // Notify users in-app
    showNotification('Reminder: You have items in your cart. Complete your purchase!');


    const userData = { userId: 123, email: 'yashbank2002@gmail.com' };
    scheduleEmailReminder(userData);
}

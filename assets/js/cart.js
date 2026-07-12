// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to Cart
function addToCart(productId, name, price, image) {

    const existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            productId,
            name,
            price,
            image,
            quantity: 1
        });
    }

    saveCart();

    alert(name + " added to cart successfully!");
}
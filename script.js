    const products = [
        {
            id: 1,
            name: "Random Item 1",
            image: "https://picsum.photos/200?random=13",
            price: 5.25
        },
        {
            id: 2,
            name: "Random Item 2",
            image: "https://picsum.photos/200?random=12",
            price: 7.50
        },
        {
            id: 3,
            name: "Random Item 3",
            image: "https://picsum.photos/200?random=11",
            price: 2.00
        },
        {
            id: 4,
            name: "Random Item 4",
            image: "https://picsum.photos/200?random=16",
            price: 4.25
        }
    ];
    document.addEventListener('DOMContentLoaded', () => {

        //Variable
        const container = document.querySelector(".products-container");
        const cartList = document.getElementById("cart-items");
        const emptyCartMsg = document.querySelector(".empty-cart-msg");
        const totalDisplay = document.querySelector(".cart-total strong");
        const totalAmount = document.getElementById("total-amount")
        const checkoutBtn = document.querySelector(".checkout-btn   ")

        function updateEmptyCartMessage() {
            if (cartList.children.length === 0) {
                emptyCartMsg.style.display = "block";
                totalDisplay.hidden = true;
            } else {
                emptyCartMsg.style.display = "none";
                totalDisplay.hidden = false;
            }
        }

        function updateEmptyCartMessage() {
            if (cartList.children.length === 0) {
                emptyCartMsg.style.display = "block";
                document.querySelector(".cart-total").style.display = "none";
            } else {
                emptyCartMsg.style.display = "none";
                document.querySelector(".cart-total").style.display = "block";
            }
        }
        

        //Adding product in the div
        products.forEach(product => {
            const li = document.createElement('li');
            li.setAttribute("class", "product-card");

            const productImg = document.createElement("img");
            productImg.setAttribute("src", product.image);
            li.appendChild(productImg);

            const productName = document.createElement("h2");
            productName.textContent = product.name;
            li.appendChild(productName);

            const priceTag = document.createElement("p");
            priceTag.textContent = `$${product.price.toFixed(2)}`;
            li.appendChild(priceTag);

            const addProductBtn = document.createElement("button");
            addProductBtn.textContent = "Add to Cart";
            addProductBtn.setAttribute("data-id", product.id);
            addProductBtn.className = "add-to-cart";

            //Event-Listener to add product in cart
            addProductBtn.addEventListener("click", () => {
                addToCart(product);
            });

            li.appendChild(addProductBtn);
            container.appendChild(li);
        });

        // Add product to cart
        function addToCart(product) {
            const existingItem = cartList.querySelector(`.cart-item[data-id='${product.id}']`);

            if (existingItem) {
                // Item already in cart, increase quantity
                alert("Product is already added to cart!!!")
                return;
            }

            // New item
            let count = 1;
            const li = document.createElement("li");
            li.className = "cart-item";
            li.setAttribute("data-id", product.id);
            li.innerHTML = `
                <span class="item-name">${product.name}</span>
                <div class="item-controls">
                    <button class="qty-btn decrement">-</button>
                    <span class="item-qty">${count}</span>
                    <button class="qty-btn increment">+</button>
                    <button class="remove-btn">Remove</button>
                </div>
            `;

            const increment = li.querySelector(".increment");
            const decrement = li.querySelector(".decrement");
            const removeBtn = li.querySelector(".remove-btn");
            const quantity = li.querySelector(".item-qty");

            increment.addEventListener("click", () => {
                count++;
                quantity.textContent = count;
                calculateTotal();
            });

            decrement.addEventListener("click", () => {
                if (count > 1) {
                    count--;
                    quantity.textContent = count;
                    calculateTotal();
                }
            });

            removeBtn.addEventListener("click", () => {
                li.remove();
                updateEmptyCartMessage();
                calculateTotal();
            });

            cartList.appendChild(li);
            updateEmptyCartMessage();
            calculateTotal();
        }


        function calculateTotal() {
            let total = 0;
        
            const cartItems = document.querySelectorAll(".cart-item");
            cartItems.forEach(item => {
                const id = parseInt(item.getAttribute("data-id"));
                const product = products.find(p => p.id === id);
                const qty = parseInt(item.querySelector(".item-qty").textContent);
                total += product.price * qty;
            });
        
            totalAmount.textContent = total.toFixed(2);
        }
        
        checkoutBtn.addEventListener("click", () => {
            const totalBeforeClear = totalAmount.textContent; // Capture total
            alert("Your Total About Bill : " + totalBeforeClear);
        
            cartList.innerHTML = "";
            updateEmptyCartMessage();
            calculateTotal();
        });

        updateEmptyCartMessage();
    });

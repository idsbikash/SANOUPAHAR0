// Current order data
let currentOrder = {
    service: '',
    package: '',
    price: 0,
    quantity: 1
};

// DOM elements
const orderButtons = document.querySelectorAll('.order-btn');
const modal = document.getElementById('orderModal');
const closeModal = document.querySelector('.close-modal');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const whatsappBtn = document.getElementById('whatsappOrderBtn');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const header = document.getElementById('header');

// Add event listeners to all order buttons
orderButtons.forEach(button => {
    button.addEventListener('click', function() {
        const service = this.getAttribute('data-service');
        const pricingList = this.closest('.service-content').querySelector('.pricing ul');
        
        // Create package selection options
        let packageOptions = '';
        pricingList.querySelectorAll('li').forEach(item => {
            const packageText = item.textContent;
            const packagePrice = item.getAttribute('data-price');
            packageOptions += `
                <div class="cart-item">
                    <div>
                        <input type="radio" name="package" id="pkg-${packagePrice}" value="${packageText}" data-price="${packagePrice}">
                        <label for="pkg-${packagePrice}">${packageText}</label>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus-btn">-</button>
                        <span class="quantity">1</span>
                        <button class="quantity-btn plus-btn">+</button>
                    </div>
                </div>
            `;
        });

        // Update modal content
        cartItemsEl.innerHTML = `
            <div class="cart-item">
                <strong>Service:</strong>
                <span>${service}</span>
            </div>
            ${packageOptions}
        `;

        // Set current order service
        currentOrder.service = service;
        currentOrder.quantity = 1;

        // Add event listeners to package selections
        document.querySelectorAll('input[name="package"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    currentOrder.package = this.value;
                    currentOrder.price = parseFloat(this.getAttribute('data-price'));
                    updateCartTotal();
                }
            });
        });

        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const quantityEl = this.parentElement.querySelector('.quantity');
                let quantity = parseInt(quantityEl.textContent);

                if (this.classList.contains('minus-btn') && quantity > 1) {
                    quantity--;
                } else if (this.classList.contains('plus-btn')) {
                    quantity++;
                }

                quantityEl.textContent = quantity;
                currentOrder.quantity = quantity;
                updateCartTotal();
            });
        });

        // Auto-select first package
        const firstPackage = document.querySelector('input[name="package"]');
        if (firstPackage) {
            firstPackage.checked = true;
            currentOrder.package = firstPackage.value;
            currentOrder.price = parseFloat(firstPackage.getAttribute('data-price'));
            updateCartTotal();
        }

        // Show modal
        modal.style.display = 'flex';
    });
});

// Close modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Update cart total
function updateCartTotal() {
    const total = currentOrder.price * currentOrder.quantity;
    cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
    
    // Update WhatsApp link
    const whatsappNumber = "14376733667";
    const message = `Hello! I would like to order:\n\n*Service:* ${currentOrder.service}\n*Package:* ${currentOrder.package}\n*Quantity:* ${currentOrder.quantity}\n*Total Amount:* $${total.toFixed(2)}\n\nPlease confirm availability.`;
    const encodedMessage = encodeURIComponent(message);
    whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

// Mobile menu toggle
hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
    this.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Header scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on page load
    const animateElements = document.querySelectorAll('.service-card, .step-card, .feature-item');
    animateElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formSuccess = document.getElementById('formSuccess');
            formSuccess.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }
});
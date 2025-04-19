// WhatsApp button animation
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-button');
    
    // Add pulse animation on page load
    setTimeout(() => {
        whatsappBtn.style.animation = 'pulse 2s infinite';
    }, 2000);
    
    // Click event for analytics (optional)
    whatsappBtn.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('WhatsApp button clicked');
    });
});

// WhatsApp button functionality
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'whatsapp-tooltip';
    tooltip.textContent = 'Chat with me on WhatsApp';
    whatsappButton.appendChild(tooltip);
    
    // Add click event to open WhatsApp
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(this.querySelector('a').href, '_blank');
    });
});
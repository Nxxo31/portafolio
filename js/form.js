// Manejo de formulario de contacto (para uso futuro)
class ContactForm {
    constructor(formElement) {
        this.form = formElement;
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Aquí se puede integrar con un servicio de email o API
        console.log('Formulario enviado:', data);
        
        // Feedback visual
        this.showMessage('Mensaje enviado correctamente', 'success');
        this.form.reset();
    }

    showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        
        this.form.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

// Inicializar si existe un formulario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        new ContactForm(form);
    }
});

//Sistema de alertas

export class Toast {
    static show(message, type = 'info', duration = 4000) { //4 segundo
        // 1. Buscar o crear el contenedor principal
        let container = document.getElementById('custom-alert-container');
        if (!container) {
            container = document.createElement('div');//crea estructura div
            container.id = 'custom-alert-container';
            container.className = 'custom-alert-container';
            document.body.appendChild(container);
        }

        // 2. Crear el elemento de la alerta
        const alertEl = document.createElement('div');//crea estructura div
        alertEl.className = `custom-alert custom-alert-${type}`; //success, error,warning, info

        // 3. Crear el texto de la alerta
        const textSpan = document.createElement('span');
        textSpan.textContent = message;

        // 4. Crear el botón de cerrar manual
        const closeBtn = document.createElement('button');
        closeBtn.className = 'custom-alert-close';
        closeBtn.innerHTML = '&times;'; // Símbolo "X"
        closeBtn.onclick = () => this.close(alertEl);

        // Ensamblar
        alertEl.appendChild(textSpan);
        alertEl.appendChild(closeBtn);
        container.appendChild(alertEl);

        // 5. Autocerrar después de los segundos definidos
        if (duration > 0) {
            setTimeout(() => {
                this.close(alertEl);
            }, duration);
        }
    }

    static close(alertEl) {
        if (alertEl.parentElement) {
            alertEl.classList.add('fade-out');
            // Esperar a que termine la animación de salida para removerlo del DOM
            alertEl.addEventListener('animationend', () => {
                alertEl.remove();
            });
        }
    }
}

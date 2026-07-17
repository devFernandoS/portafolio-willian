/**
 * Theme Switcher (V3 - Botones y Anti-Flash)
 *
 * Gestiona la selección, aplicación y persistencia del tema de la UI.
 * Funciona en conjunto con un script inline en el <head> para prevenir el FOUC.
 */

const THEME_STORAGE_KEY = 'user-theme';
const themeButtons = document.querySelectorAll('.theme-btn');

/**
 * Aplica el tema seleccionado al documento y lo guarda en localStorage.
 * @param {string} theme - El nombre del tema (e.g., 'light', 'dark', 'stellar').
 */
function applyTheme(theme) {
    if (!theme) return;

    // Pone el atributo `data-theme` en la etiqueta <html>
    document.documentElement.setAttribute('data-theme', theme);

    // Guarda la preferencia del usuario
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Actualiza el estado visual de los botones
    themeButtons.forEach(btn => {
        if (btn.dataset.themeValue === theme) {
            // Estilo para el botón activo
            btn.classList.add('bg-accent-primary', 'text-surface-lowest');
            btn.classList.remove('hover:bg-surface-low');
        } else {
            // Estilo para los botones inactivos
            btn.classList.remove('bg-accent-primary', 'text-surface-lowest');
            btn.classList.add('hover:bg-surface-low');
        }
    });
}

/**
 * Obtiene el tema actual directamente del atributo `data-theme` del HTML.
 * @returns {string} El tema actual.
 */
function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

// Event listeners para cuando el usuario hace clic en un botón de tema
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        applyTheme(btn.dataset.themeValue);
    });
});

// Aplica el estilo visual a los botones según el tema actual al cargar la página.
applyTheme(getCurrentTheme());
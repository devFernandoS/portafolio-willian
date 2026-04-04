/**
 * Theme Switcher (V2)
 *
 * Gestiona la selección, aplicación y persistencia del tema de la UI.
 */

const THEME_STORAGE_KEY = 'user-theme';
const themeSelector = document.getElementById('theme-selector');

/**
 * Aplica el tema seleccionado al documento y lo guarda en localStorage.
 * @param {string} theme - El nombre del tema (e.g., 'light', 'dark', 'stellar').
 */
function applyTheme(theme) {
    // Pone el atributo `data-theme` en la etiqueta <html>
    document.documentElement.setAttribute('data-theme', theme);

    // Guarda la preferencia del usuario
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Sincroniza el <select> con el tema actual
    if (themeSelector) {
        themeSelector.value = theme;
    }
}

/**
 * Obtiene el tema inicial al cargar la página.
 * Prioridad: localStorage > Preferencia del sistema > Default (light).
 * @returns {string} El tema a aplicar.
 */
function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
        return savedTheme;
    }

    // Si no hay tema guardado, revisa la preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

// Event listener para cuando el usuario cambia la opción en el <select>
themeSelector?.addEventListener('change', (event) => {
    applyTheme(event.target.value);
});

// Aplica el tema inicial en cuanto el script se carga
applyTheme(getInitialTheme());
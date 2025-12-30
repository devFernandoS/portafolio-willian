
const themeToggle = document.getElementById('theme-toggle');
const html = document.querySelector('html');

// On page load, check for saved theme in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.classList.add(savedTheme);
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'light';
    }
});

if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            html.classList.remove('dark');
            html.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.remove('light');
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

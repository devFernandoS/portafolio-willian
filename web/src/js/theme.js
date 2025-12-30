
const themeToggle = document.getElementById('theme-toggle');
const html = document.querySelector('html');

// On page load, check for saved theme in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.classList.add(savedTheme);
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
    }
});

if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            html.classList.remove('light');
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    });
}

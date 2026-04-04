const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-link").forEach(link => {
    const linkPage = link.getAttribute("href");


    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
        link.classList.add("active");

    }
});


// Seleccionamos los elementos
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconMenu = document.getElementById('icon-menu');
// const iconClose = document.getElementById('icon-close');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        // Alternamos la clase 'hidden' y 'flex' del menú
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');

        // Alternamos los íconos de hamburguesa (menu) y equis (x)
        iconMenu.classList.toggle('hidden');
        // iconClose.classList.toggle('hidden');
    });
}
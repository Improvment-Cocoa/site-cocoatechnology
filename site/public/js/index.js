const navbar = document.getElementById("nav");

function rolagem() {
    navbar.classList.toggle("ativa", scrollY > 0);
}

window.addEventListener("scroll", rolagem);
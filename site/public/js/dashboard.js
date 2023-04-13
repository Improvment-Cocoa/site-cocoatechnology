const divTitle = document.getElementById("div-title");

function rolagem() {
    divTitle.classList.toggle("ativa", scrollY > 0);
}

window.addEventListener("scroll", rolagem);
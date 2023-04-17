const navbar = document.getElementById("nav");

function rolagem() {
    navbar.classList.toggle("ativa", scrollY > 0);
}

window.addEventListener("scroll", rolagem);

function simulador(){
    var qnt_hectares = Number(input_hectares.value);
    var sacas_produzidas = Number(input_sacas.value);
    var valor_saca = Number(input_valorsacas.value);
    var despesas = Number(input_despezas.value);

    var semCocoa = (sacas_produzidas * valor_saca) - despesas;
    var perdaHectare = (qnt_hectares*10000) * 0.30;

    var comCocoa = (sacas_produzidas * 1.25) * valor_saca - despesas;
    var lucro = comCocoa - semCocoa;
    var produtividadehectare = (qnt_hectares*10000) * 0.05;


    div_resulCalculo.innerHTML = ` 
    
    <h1>Sem a solução da Cocoa Technology</h1><br>
    <p>O valor de retorno será de R$${semCocoa}.</p>
    <p>Perda de ${perdaHectare}(M²) da produtividade na plantação!</p><br>

    <h1>Com a solução da Cocoa Technology</h1><br>
    <p>O valor de retorno será de R$${comCocoa}</p>
    <p>Obtendo um aumento no lucro de R$${lucro}</p>`;
}
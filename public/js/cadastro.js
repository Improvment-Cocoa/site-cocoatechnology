function key_email() {
    var email = input_email.value
    var erro = document.getElementById('erro_email')
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    var input = document.getElementById('input_email')

    if (email == "") {
        erro.innerHTML = `Campo vazio`
        erro.style.color = 'RED'
        input.style.borderBottom = '1px solid red'

    }
    else if (!reg.test(email)) {
        erro.innerHTML = `Email inválido`
        erro.style.color = 'RED'
        input.style.borderBottom = '1px solid red'
    }
    else {
        erro.innerHTML = `Email válido`
        erro.style.color = 'green'
        input.style.borderBottom = '1px solid green'
    }

}
function key_senha() {
    var senha = input_senha.value
    var erro = document.getElementById('erro_senha')
    var input = document.getElementById('input_senha')

    if (senha.length < 3) {
        erro.innerHTML = `Digite uma senha maior que 3 caracteres`
        input.style.borderBottom = '1px solid red'
        erro.style.color = 'red'
    }
    
    else if (senha.length >= 3 && senha.length <= 5) {
        erro.innerHTML = `Senha fraca`
        input.style.borderBottom = '1px solid #FF4500'
        erro.style.color = '#FF4500'
    }
    else if (senha.length >= 6 && senha.length <= 8) {
        erro.innerHTML = `Senha média`
        input.style.borderBottom = '1px solid  #EFC253'
        erro.style.color = ' #EFC253'
    }
    else {
        erro.innerHTML = `Senha forte`
        input.style.borderBottom = '1px solid  green'
        erro.style.color = 'green'
    }
}
function key_confirmar_senha() {
    var senha = input_senha.value
    var confirmar_senha = input_confirmar_senha.value
    var erro = document.getElementById('erro_confirmar_senha')
    var input = document.getElementById('input_confirmar_senha')
    
    if (confirmar_senha == senha) {
        erro.innerHTML = `Senhas compatível`
        input.style.borderBottom = '1px solid  green'
        erro.style.color = 'green'
    }
    else{
        erro.innerHTML = `Senhas não compatível`
        input.style.borderBottom = '1px solid red'
        erro.style.color = 'red'
    }
}

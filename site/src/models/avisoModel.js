var database = require("../database/config");

function listar(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select usuario.idusuario , usuario.nome 
    from usuario join cliente on idcliente = fkusuario_cliente where idcliente = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucao = `
    SELECT usuario.idusuario , usuario.nome from usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `
    SELECT usuario.idusuario , usuario.nome from usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function publicar(nome, email, senha , idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", nome, email, senha , idUsuario);
    var instrucao = `
        INSERT INTO usuario (nome, email, senha , fkUsuario_cliente) VALUES ('${nome}', '${email}', ${senha} , '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(novaDescricao, idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucao = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucao = `
    DELETE FROM usuario WHERE idusuario = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function mostrar_dados(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucao = `
    select usuario.nome as nome , usuario.email , cliente.nome as responsavel , cliente.cnpj 
    from usuario join cliente on idcliente =  fkusuario_cliente where usuario.idusuario = ${idAviso}; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}





function plantacoes(nome_plantacao , temp_max , umid_max , cep , cidade , numero , tamanho_plantacao , temp_min , umid_min , estado , bairro , complemento , idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_plantacoes(): ", nome_plantacao , temp_max , umid_max , cep , cidade , numero , tamanho_plantacao , temp_min , umid_min , estado , bairro , complemento);
    var instrucao_plantacao = `
        INSERT INTO plantacao (nome, tamanho_plantacao , fkPlantacao_cliente) VALUES ('${nome_plantacao}', '${tamanho_plantacao}' , '${idUsuario}');
    `;

    var instucao_paramentro = `INSERT INTO plantacao_param(temp_min , temp_max ,  umid_min , umid_max) VALUES ('${temp_min}' , '${temp_max}' , '${umid_min}' , '${umid_max}')`;
    console.log("Executando a instrução SQL: \n" + instrucao);


    var instucao_endereco = `INSERT INTO endereco(cep , estado , bairro , numero , complemento) VALUES ('${cep}' , '${estado} , '${bairro}' , '${numero} , '${complemento}');`
    return database.executar(instrucao_plantacao , instucao_paramentro , instucao_endereco);
}
module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    mostrar_dados,
    plantacoes
}

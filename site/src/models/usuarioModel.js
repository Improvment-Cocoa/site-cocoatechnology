var database = require("../database/config");

function listar() {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
    SELECT * FROM cliente;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
  var instrucao = `
    SELECT * FROM cliente WHERE email = '${email}' AND senha = '${senha}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrar(nome, email, senha, cpf, cnpj, cep, estado, cidade, bairro, numero, complemento) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cpf , cnpj);

  var instrucao = `
    INSERT INTO cliente (nome, email, senha, cpf, cnpj) VALUES ('${nome}', '${email}', '${senha}', '${cpf}', '${cnpj}');
  `;

  var instrucaoEndereco = `
    INSERT INTO endereco (cep, estado, cidade, bairro, numero, complemento) VALUES ('${cep}', '${estado}', '${cidade}', '${bairro}', '${numero}', '${complemento}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucao , instrucaoEndereco);

  return new Promise((resolve, reject) => {
    database.executar(instrucao)
      .then((resultado) => {
        var idUsuario = resultado.insertId;
        sessionStorage.setItem('ID_USUARIO', idUsuario.toString());

        console.log("Executando a instrução SQL para cadastrar endereço: \n" + instrucaoEndereco);

        database.executar(instrucaoEndereco)
          .then((resultadoEndereco) => {
            var idEndereco = resultadoEndereco.insertId;

            var instrucaoAtualizacao = `
            UPDATE cliente SET fkEndereco_cliente = '${idEndereco}' WHERE idcliente = '${idUsuario}';`;
            

            console.log("Executando a instrução SQL para atualizar cliente com o id de endereço: \n" + instrucaoAtualizacao);

            database.executar(instrucaoAtualizacao)


            
              .then(() => {
                resolve(resultado);
              })
              .catch((erro) => {
                reject(erro);
              });
          })
          .catch((erro) => {
            reject(erro);
          });
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}

module.exports = {
  entrar,
  cadastrar,
  listar
};
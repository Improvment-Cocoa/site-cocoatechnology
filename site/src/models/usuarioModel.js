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
  select 'cliente' as tipo_cliente ,  cliente.idcliente as id,cliente.nome  as nome,  cliente.email as email, cliente.senha as senha,endereco.idendereco from cliente 
  join endereco on idendereco = fkendereco_cliente
  where cliente.email = '${email}' and cliente.senha = '${senha}'
  union
  select 'usuario' as tipo_cliente , usuario.idusuario as id ,usuario.nome as nome , usuario.email as email, usuario.senha as senha, endereco.idendereco  from usuario 
  join cliente  on idcliente = fkusuario_cliente
  join endereco on endereco.idendereco = cliente.fkendereco_cliente 
  where usuario.email = '${email}' and usuario.senha = '${senha}'; 
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
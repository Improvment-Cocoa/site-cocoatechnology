var usuarioModel = require("../models/usuarioModel");

function listar(req, res) {
  usuarioModel.listar()
    .then((resultados) => {
      res.json(resultados);
    })
    .catch((erro) => {
      res.status(500).json({ mensagem: "Erro ao listar usuários", erro: erro });
    });
}

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  usuarioModel.entrar(email, senha).then((resultados) => {
      res.json(resultados);
    })
    .catch((erro) => {
      res.status(500).json({ mensagem: "Erro ao entrar", erro: erro });
    });
}

function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cpf = req.body.cpfServer;
  var cnpj = req.body.cnpjServer;
  var cep = req.body.cepServer;
  var estado = req.body.estadoServer;
  var cidade = req.body.cidadeServer;
  var bairro = req.body.bairroServer;
  var numero = req.body.numeroServer;
  var complemento = req.body.complementoServer;

 

  usuarioModel.cadastrar(nome, email, senha, cpf, cnpj, cep, estado, cidade, bairro, numero, complemento)
    .then((resultados) => {
      res.json(resultados);
    })
    .catch((erro) => {
      res.status(500).json({ mensagem: "Erro ao cadastrar usuário", erro: erro });
    });
}

module.exports = {
  listar,
  entrar,
  cadastrar
};
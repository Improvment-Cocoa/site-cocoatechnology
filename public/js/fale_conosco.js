const send = require('gmail-send');
var nome = iptNome.value
var email = iptEmail.value
var assunto =  iptTitulo.value
const options = {
    user: 'ewertonzorolima@gmail.com',
    pass: 'audglajeqwsrgrbx',
    to: `${email}`,
    subject: `${assunto}`,
    html: '<p>Conteúdo do e-mail em HTML</p>'
  };

  send(options, function (err, res) {
    if (err) {
      console.error(err);
    } else {
      console.log('E-mail enviado com sucesso!');
    }
  });
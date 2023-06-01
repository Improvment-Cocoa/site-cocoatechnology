var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/exibirPlantacoes/:idCliente", function (req, res) {
    medidaController.exibirPlantacoes(req, res);
});

router.get("/exibirLeituraPlantacoes/:idCliente", function (req, res) {
    medidaController.exibirLeituraPlantacoes(req, res);
});

router.get("/temperatura_contante/:idCliente", function (req, res) {
    medidaController.temperatura_contante(req, res);
})

router.get("/obterquantidadeusuario/:idCliente", function (req, res) {
    medidaController.obterquantidadeusuario(req, res);
})

router.get("/obterquantidadeplantacoes/:idCliente", function (req, res) {
    medidaController.obterquantidadeplantacoes(req, res);
})

router.get("/obterplantacoesemalerta/:idCliente", function (req, res) {
    medidaController.obterplantacoesemalerta(req, res);
})

router.get("/tabelaDash/:idCliente", function (req, res) {
    medidaController.tabelaDash(req, res);
})

router.get("/dados_temperatura/:idCliente", function (req, res) {
    medidaController.dados_temperatura(req, res);
})


router.get("/ultimas/:idsensor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idsensor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/medidas_temperatura_ultimas/:idsensor", function (req, res) {
    medidaController.medidas_temperatura_ultimas(req, res);
})
router.get("/medidas_umidade_ultimas/:idsensor", function (req, res) {
    medidaController.medidas_umidade_ultimas(req, res);
})

router.get("/temperatura_atual/:idCliente", function (req, res) {
    medidaController.temperatura_atual(req, res);
})


router.get("/dados_umidade/:idsensor", function (req, res) {
    medidaController.dados_umidade(req, res);
})

router.get("/status_plantacoes/:idsensor", function (req, res) {
    medidaController.status_plantacoes(req, res);
})

module.exports = router;
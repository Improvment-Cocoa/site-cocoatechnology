var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

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
router.get("/temperatura_contante/:idsensor", function (req, res) {
    medidaController.temperatura_contante(req, res);
})
router.get("/temperatura_atual/:idsensor", function (req, res) {
    medidaController.temperatura_atual(req, res);
})

router.get("/dados_temperatura/:idsensor", function (req, res) {
    medidaController.dados_temperatura(req, res);
})
router.get("/dados_umidade/:idsensor", function (req, res) {
    medidaController.dados_umidade(req, res);
})

router.get("/obterquantidadeusuario/:idAquario", function (req, res) {
    medidaController.obterquantidadeusuario(req, res);
})

router.get("/obterquantidadeplantacoes/:idAquario", function (req, res) {
    medidaController.obterquantidadeplantacoes(req, res);
})


module.exports = router;
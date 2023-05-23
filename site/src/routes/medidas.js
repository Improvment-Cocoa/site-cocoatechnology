var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idsensor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idsensor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})



router.get("/dados_temperatura/:idsensor", function (req, res) {
    medidaController.dados_temperatura(req, res);
})

module.exports = router;
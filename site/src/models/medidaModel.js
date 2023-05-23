var database = require("../database/config");

function buscarUltimasMedidas(idsensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select 
        retorno_temp as temperatura, 
        retorno_umidd as umidade,
        dataLeitura_hora,
        fkLeitura_sensor
                    from leitura where fkLeitura_sensor = ${idsensor};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select retorno_umidd as umidade,
        DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as momento_grafico
        from leitura where fkLeitura_sensor = 2
    order by idleitura desc limit 1;
`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idsensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select 
        retorno_temp as temperatura, 
        retorno_umidd as umidade,
        dataLeitura_hora,
        fkLeitura_sensor
                    from leitura where fkLeitura_sensor = ${idsensor};`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select retorno_umidd as umidade,
        DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as momento_grafico
        from leitura where fkLeitura_sensor = 2
    order by idleitura desc limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function dados_temperatura(idsensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select 
        retorno_umidd as umidade,
        dataLeitura_hora,
        fkLeitura_sensor
                    from leitura where fkLeitura_sensor = ${idsensor};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        retorno_umidd as umidade,
        dataLeitura_hora,
        fkLeitura_sensor
                    from leitura where fkLeitura_sensor = 2;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal, 
    dados_temperatura
}

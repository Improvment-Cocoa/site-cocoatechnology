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
        order by idleitura  desc limit 1;
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
        retorno_temp as temperatura ,
        dataLeitura_hora, 
        DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as momento_grafico, 
        fkLeitura_sensor 
        from leitura where fkLeitura_sensor = 2
        order by idleitura  desc limit 5;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function medidas_temperatura_ultimas(idAquario ,  limite_linhas) {

   
    instrucaoSql = `select   
    retorno_temp as temperatura ,
    dataLeitura_hora, 
    DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as momento_grafico, 
    fkLeitura_sensor 
    from leitura where fkLeitura_sensor = 2
    order by idleitura desc limit ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function medidas_umidade_ultimas(idAquario ,  limite_linhas) {

   
    instrucaoSql = `select   
    retorno_umidd as umidade ,
    dataLeitura_hora, 
    DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as momento_grafico, 
    fkLeitura_sensor 
    from leitura where fkLeitura_sensor = 2
order by dataLeitura_hora desc limit ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function dados_umidade(idsensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select 
        retorno_umidd as umidade,
        dataLeitura_hora,
        fkLeitura_sensor
                    from leitura where fkLeitura_sensor = ${idsensor};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select   
        retorno_umidd as umidade ,
        dataLeitura_hora, 
        DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as momento_grafico, 
        fkLeitura_sensor 
        from leitura where fkLeitura_sensor = 2
        order by idleitura  desc limit 5;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function temperatura_contante(idsensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select 
        retorno_umidd as umidade,
        dataLeitura_hora,
        fkLeitura_sensor
                    from leitura where fkLeitura_sensor = ${idsensor};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select plantacao.nome,  round(avg(retorno_temp) , 2) as temperatura , round(avg(retorno_umidd), 2) as umidade from leitura
        join sensor on idsensor = fkLeitura_sensor
        join plantacao on idplantacao = fkSensor_plantacao group by plantacao.nome;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function temperatura_atual(idsensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select 
        retorno_umidd as umidade,
        dataLeitura_hora,
        fkLeitura_sensor
                    from leitura where fkLeitura_sensor = ${idsensor};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select plantacao.nome,  retorno_temp as temperatura , retorno_umidd as umidade from leitura
        join sensor on idsensor = fkLeitura_sensor
        join plantacao on idplantacao = fkSensor_plantacao group by plantacao.nome;
        `;
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
    dados_temperatura,
    medidas_temperatura_ultimas,
    dados_umidade,
    medidas_umidade_ultimas,
    temperatura_contante,
    temperatura_atual
}

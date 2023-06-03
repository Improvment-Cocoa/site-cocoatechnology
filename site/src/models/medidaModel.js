var database = require("../database/config");

function exibirPlantacoes(idCliente, limite_linhas) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select plantacao.* from plantacao join cliente on fkPlantacao_cliente = idcliente
        where idcliente = ${idCliente};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select plantacao.* from plantacao join cliente on fkPlantacao_cliente = idcliente
        where idcliente = ${idCliente};
`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirLeituraPlantacoes(idPlantacao, limite_linhas) {
    instrucaoSql = ''
        instrucaoSql = `select 
        retorno_temp ,
        retorno_umidd,
        DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as dataLeitura_hora,
        fkLeitura_sensor 
        from leitura join sensor on fkLeitura_sensor = idsensor
	    join plantacao on fkSensor_plantacao = idplantacao
		where idplantacao = ${idPlantacao} order by idleitura desc limit 7;`;
   
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ultimosDadosPlantacao(idCliente, limite_linhas) {
    instrucaoSql = `select  plantacao.idplantacao, plantacao.nome,
        retorno_temp as temperatura ,
        retorno_umidd as umidade,
        dataLeitura_hora, 
        DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as momento_grafico, 
        fkLeitura_sensor 
        from leitura join sensor on idsensor = fkLeitura_sensor
        join plantacao on idplantacao = fkSensor_plantacao 
        join cliente on fkPlantacao_cliente = idcliente
			where idcliente = ${idCliente} and idLeitura IN (select MAX(idleitura) from leitura group by fkLeitura_sensor);
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterquantidadeusuario(idCliente) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT COUNT(idusuario) AS qtdUsu FROM usuario where fkUsuario_cliente = ${idCliente};`;
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(idusuario) AS qtdUsu FROM usuario where fkUsuario_cliente = ${idCliente};
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterplantacoesemalerta(idCliente) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(distinct idleitura) as alertaPerigo from plantacao join sensor on fkSensor_plantacao = idsensor
        join leitura on fkLeitura_sensor = idsensor join cliente on fkPlantacao_cliente = idcliente
            where (retorno_temp > 27 OR retorno_umidd > 85) AND idcliente = ${idCliente};`;
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select count(distinct idleitura) as alertaPerigo from plantacao join sensor on fkSensor_plantacao = idsensor
        join leitura on fkLeitura_sensor = idsensor join cliente on fkPlantacao_cliente = idcliente
            where (retorno_temp > 27 OR retorno_umidd > 85) AND idcliente = ${idCliente};
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterquantidadeplantacoes(idCliente) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT COUNT(idplantacao) AS qtdPlantacao FROM plantacao join cliente on fkPlantacao_cliente = idcliente
        where idcliente = ${idCliente};`;
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(idplantacao) AS qtdPlantacao FROM plantacao join cliente on fkPlantacao_cliente = idcliente
        where idcliente = ${idCliente};
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function status_plantacoes(idCliente) {
    instrucaoSql = `
    select 
    idcliente as cliente,
    (
    select count(idplantacao) from leitura join sensor on idsensor = fkLeitura_sensor join plantacao on idplantacao = fkSensor_plantacao join cliente on fkPlantacao_cliente = idcliente where ( (retorno_temp > 29 or retorno_temp < 17) or (retorno_umidd > 85 or retorno_umidd < 75) ) and idcliente = ${idCliente} and idleitura IN (select MAX(idleitura) from leitura group by fkLeitura_sensor)
    ) AS perigo,
    (
    select count(idplantacao) from leitura join sensor on idsensor = fkLeitura_sensor join plantacao on idplantacao = fkSensor_plantacao join cliente on fkPlantacao_cliente = idcliente where ( ( (retorno_temp >= 27 and retorno_temp <= 28) or (retorno_temp >= 17 and retorno_temp <= 19) ) and (retorno_umidd <= 85 and retorno_umidd >= 75) ) and idcliente = ${idCliente} and idleitura IN (select MAX(idleitura) from leitura group by fkLeitura_sensor)
    ) AS cuidado,
    (
    select count(idplantacao) from leitura join sensor on idsensor = fkLeitura_sensor join plantacao on idplantacao = fkSensor_plantacao join cliente on fkPlantacao_cliente = idcliente where ( (retorno_temp >= 25 and retorno_temp <= 26) and (retorno_umidd <= 85 and retorno_umidd >= 75) ) and idcliente = ${idCliente} and idleitura IN (select MAX(idleitura) from leitura group by fkLeitura_sensor)
    ) AS atencao,
    (
    select count(idplantacao) from leitura join sensor on idsensor = fkLeitura_sensor join plantacao on idplantacao = fkSensor_plantacao join cliente on fkPlantacao_cliente = idcliente where ( (retorno_temp >= 20 and retorno_temp <= 24) and (retorno_umidd <= 85 and retorno_umidd >= 75) ) and idcliente = ${idCliente} and idleitura IN (select MAX(idleitura) from leitura group by fkLeitura_sensor)
    ) as tranquilo
    from leitura join sensor on idsensor = fkLeitura_sensor join plantacao on idplantacao = fkSensor_plantacao join cliente on fkPlantacao_cliente = idcliente where idcliente = ${idCliente} group by idcliente;
        `;

    return database.executar(instrucaoSql);
}




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
        retorno_temp as temperatura,
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

function medidas_temperatura_ultimas(idAquario, limite_linhas) {
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

function medidas_umidade_ultimas(idPlantacao, limite_linhas) {
    instrucaoSql = `select   
    retorno_umidd as umidade ,
    retorno_temp as temperatura,
    dataLeitura_hora, 
    DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as momento_grafico, 
    fkLeitura_sensor 
    from leitura join sensor on fkLeitura_sensor = idsensor where fkSensor_plantacao = ${idPlantacao}
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


function temperatura_atual(idCliente, limite_linhas) {
    instrucaoSql = `select plantacao.nome, retorno_temp as temperatura , retorno_umidd as umidade from leitura
        join sensor on idsensor = fkLeitura_sensor
        join plantacao on idplantacao = fkSensor_plantacao 
        join cliente on fkPlantacao_cliente = idcliente
			where idcliente = ${idCliente} group by plantacao.nome, retorno_temp, retorno_umidd;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function obternomeplantacoes(idUsuario, limite_linhas) {
    instrucaoSql = `select plantacao.nome as nome from plantacao 
    join cliente on idcliente = fkPlantacao_cliente where idcliente = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    exibirPlantacoes,
    obternomeplantacoes,
    exibirLeituraPlantacoes,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    medidas_temperatura_ultimas,
    dados_umidade,
    medidas_umidade_ultimas,
    ultimosDadosPlantacao,
    temperatura_atual,
    obterquantidadeplantacoes,
    obterplantacoesemalerta,
    obterquantidadeusuario,
    status_plantacoes,
}

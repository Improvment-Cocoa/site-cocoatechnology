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

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select leitura.* from leitura join sensor on fkLeitura_sensor = idsensor
	join plantacao on fkSensor_plantacao = idplantacao
		where idplantacao = ${idPlantacao};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select leitura.* from leitura join sensor on fkLeitura_sensor = idsensor
	join plantacao on fkSensor_plantacao = idplantacao
		where idplantacao = ${idPlantacao};
`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
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

function medidas_umidade_ultimas(idAquario, limite_linhas) {
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

function temperatura_contante(idCliente, limite_linhas) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select plantacao.nome, retorno_temp as temperatura, retorno_umidd as umidade, dataLeitura_hora, fkLeitura_sensor from leitura 
        join sensor on fkLeitura_sensor = idsensor
        join plantacao on fkSensor_plantacao = idplantacao
        join cliente on fkPlantacao_cliente = idcliente
            where idcliente = ${idCliente};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select plantacao.nome, retorno_temp as temperatura, retorno_umidd as umidade, dataLeitura_hora, fkLeitura_sensor from leitura 
        join sensor on fkLeitura_sensor = idsensor
        join plantacao on fkSensor_plantacao = idplantacao
        join cliente on fkPlantacao_cliente = idcliente
            where idcliente = ${idCliente};
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function temperatura_atual(idCliente, limite_linhas) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select plantacao.nome, retorno_temp as temperatura , retorno_umidd as umidade from leitura
        join sensor on idsensor = fkLeitura_sensor
        join plantacao on idplantacao = fkSensor_plantacao 
        join cliente on fkPlantacao_cliente = idcliente
			where idcliente = ${idCliente} group by plantacao.nome, retorno_temp, retorno_umidd;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select plantacao.nome, retorno_temp as temperatura , retorno_umidd as umidade from leitura
        join sensor on idsensor = fkLeitura_sensor
        join plantacao on idplantacao = fkSensor_plantacao 
        join cliente on fkPlantacao_cliente = idcliente
			where idcliente = ${idCliente} group by plantacao.nome, retorno_temp, retorno_umidd;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

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
        instrucaoSql = `select count(idplantacao) as alertaPerigo from plantacao join sensor on fkSensor_plantacao = idsensor
	join leitura on fkLeitura_sensor = idsensor join cliente on fkPlantacao_cliente = idcliente
		where retorno_temp > 26 AND idcliente = ${idCliente};`;
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select count(idplantacao) as alertaPerigo from plantacao join sensor on fkSensor_plantacao = idsensor
	join leitura on fkLeitura_sensor = idsensor join cliente on fkPlantacao_cliente = idcliente
		where retorno_temp > 26 AND idcliente = ${idCliente};
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

function status_plantacoes(idAquario) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(idplantacao) as qtdPlantacaoPerigo from plantacao join cliente on fkPlantacao_cliente = idcliente 
	join sensor on fkSensor_plantacao = idplantacao
    join leitura on fkLeitura_sensor = idsensor
		where idcliente = 1 AND ( (retorno_temp > 26 OR retorno_temp < 20) OR (retorno_umidd > 85 OR retorno_umidd < 75) );`;
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select count(idplantacao) as qtdPlantacaoPerigo from plantacao join cliente on fkPlantacao_cliente = idcliente 
	join sensor on fkSensor_plantacao = idplantacao
    join leitura on fkLeitura_sensor = idsensor
		where idcliente = 1 AND ( (retorno_temp > 26 OR retorno_temp < 20) OR (retorno_umidd > 85 OR retorno_umidd < 75) );
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    exibirPlantacoes,
    exibirLeituraPlantacoes,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    dados_temperatura,
    medidas_temperatura_ultimas,
    dados_umidade,
    medidas_umidade_ultimas,
    temperatura_contante,
    temperatura_atual,
    obterquantidadeplantacoes,
    obterplantacoesemalerta,
    obterquantidadeusuario,
    status_plantacoes
}

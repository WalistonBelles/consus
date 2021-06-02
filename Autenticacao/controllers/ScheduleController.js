var Schedule = require("../models/Schedule");
var Doctor = require("../models/Doctor");
var User = require("../models/User");
var RequestingUnit = require("../models/RequestingUnit");
var axios = require('axios');

class ScheduleController{

    async findAllConsultas(req, res){
        var {ano, mes, dia, hora, minuto} = req.body;
        if (ano == undefined || ano == '' || ano == ' '){
            res.status(400);
            res.json({err: "Ano inválido!"});
            return;
        }
        if (mes == undefined || mes == '' || mes == ' '){
            res.status(400);
            res.json({err: "Mês inválido!"});
            return;
        }
        if (dia == undefined || dia == '' || dia == ' '){
            res.status(400);
            res.json({err: "Dia inválido!"});
            return;
        }
        if (hora == undefined || hora == '' || hora == ' '){
            res.status(400);
            res.json({err: "Horário Inválido inválido!"});
            return;
        }
        if (minuto == undefined || minuto == '' || minuto == ' '){
            res.status(400);
            res.json({err: "Minuto Inválido inválido!"});
            return;
        }
        axios.post('http://localhost:8080/book?year='+ano+'&month='+mes+'&day='+dia+'&hour='+hora+'&minute='+minuto)
        .then(res => {
        }).catch(err => {
            res.status(400);
            res.json({err: err});
            return;
        })
        res.status(200);
        res.send("Agendado!");
    }

    async create(req, res){
        var {dataDeRegistro, crm, cpf_paciente, nome_unidade} = req.body;
        if (crm == undefined || crm == '' || crm == ' '){
            res.status(400);
            res.json({err: "CRM inválido!"});
            return;
        }
        if (cpf_paciente == undefined || cpf_paciente == '' || cpf_paciente == ' '){
            res.status(400);
            res.json({err: "CPF inválido!"});
            return;
        }
        if (nome_unidade == undefined || nome_unidade == '' || nome_unidade == ' '){
            res.status(400);
            res.json({err: "Nome inválido!"});
            return;
        }
        if (dataDeRegistro == undefined || dataDeRegistro == '' || dataDeRegistro == ' '){
            res.status(400);
            res.json({err: "Data inválida!"});
            return;
        }
        // Confere se o médico existe
        var resultadoCRM = await Doctor.findByCRM(crm);
        if(resultadoCRM == undefined){
            res.status(400);
            res.json({err: "O médico não está cadastrado!"});
            return;
        }
        // Confere se o paciente existe
        var resultadoCPF = await User.findCPF(cpf_paciente);
        if(resultadoCPF == undefined){
            res.status(400);
            res.json({err: "O paciente não está cadastrado!"});
            return;
        }
        // Confere se a Unidade Existe
        var resultadoUnidade = await RequestingUnit.findByNome(nome_unidade);
        if(resultadoUnidade == undefined){
            res.status(400);
            res.json({err: "A unidade não está cadastrada!"});
            return;
        }
        await Schedule.new(dataDeRegistro, resultadoCRM.id, resultadoCPF.id, resultadoUnidade.id);
        res.status(200);
        res.send("Cadastrado!");
    }
}

module.exports = new ScheduleController();
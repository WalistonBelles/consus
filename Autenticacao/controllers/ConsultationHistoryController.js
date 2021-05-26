var ConsultationHistory = require("../models/ConsultationHistory");
var Doctor = require("../models/Doctor");
var User = require("../models/User");
var RequestingUnit = require("../models/RequestingUnit");

class ConsultationHistoryController{
    async index(req, res){
        var {cpf} = req.body;
        // Confere se o paciente existe
        var resultadoCPF = await User.findCPF(cpf);
        if(resultadoCPF == undefined){
            res.status(400);
            res.json({err: "Este paciente não está cadastrado!"});
            return;
        }
        var querys = await ConsultationHistory.findAll(resultadoCPF.id);
        //var resultado = await ConsultationHistory.findDoctor(querys[0].id_usuario);
        var resultado = await Promise.all(querys.map(async (i) => {
            i.id_usuario = await ConsultationHistory.findDoctor(i.id_usuario);
            return i.id_usuario;
        }));
        res.json(querys);
    }

    async indexConsultas(req, res){
        var consultas = await ConsultationHistory.findAllConsultas();
        res.json(consultas);
    }
    
    async indexMedico(req, res){
        var {id_medico} = req.body;
        var doctors = await ConsultationHistory.findDoctor(id_medico);
        res.json(doctors);
    }

    async create(req, res){
        var {crm, cpf, nome, descricao, data} = req.body;

        if (crm == undefined || crm == '' || crm == ' '){
            res.status(400);
            res.json({err: "CRM inválido!"});
            return;
        }
        if (cpf == undefined || cpf == '' || cpf == ' '){
            res.status(400);
            res.json({err: "CPF inválido!"});
            return;
        }
        if (nome == undefined || nome == '' || nome == ' '){
            res.status(400);
            res.json({err: "Nome inválido!"});
            return;
        }
        if (descricao == undefined || descricao == '' || descricao == ' '){
            res.status(400);
            res.json({err: "Descrição inválida!"});
            return;
        }
        if (data == undefined || data == '' || data == ' '){
            res.status(400);
            res.json({err: "Data inválida!"});
            return;
        }
        // Confere se o médico existe
        var resultadoCRM = await Doctor.findByCRM(crm);
        if(resultadoCRM == undefined){
            res.status(400);
            res.json({err: "Esse médico não está cadastrado!"});
            return;
        }
        // Confere se o paciente existe
        var resultadoCPF = await User.findCPF(cpf);
        if(resultadoCPF == undefined){
            res.status(400);
            res.json({err: "O paciente não está cadastrado!"});
            return;
        }
        // Confere se a Unidade Existe
        var resultadoUnidade = await RequestingUnit.findByNome(nome);
        if(resultadoUnidade == undefined){
            res.status(400);
            res.json({err: "A unidade não está cadastrada!"});
            return;
        }
        await ConsultationHistory.new(resultadoCRM.id, resultadoCPF.id, resultadoUnidade.id, descricao, data);
        res.status(200);
        res.send("Cadastrado!");
    }
}

module.exports = new ConsultationHistoryController();
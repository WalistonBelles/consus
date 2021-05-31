var Query = require("../models/Query");
var Doctor = require("../models/Doctor");
var RequestingUnit = require("../models/RequestingUnit");
var ConsultationHistory = require("../models/ConsultationHistory");
var PerformerUnit = require("../models/PerformerUnit");
var Exam = require("../models/Exam");
var Queue = require("../models/Queue");
var Patient = require("../models/Patient");

class QueryController{

    async index(req, res){
        var {crm} = req.body;
        // Confere se o paciente existe
        var resultadoCRM = await Doctor.findByCRM(crm);
        if(resultadoCRM == undefined){
            res.status(400);
            res.json({err: "Este médico não está cadastrado!"});
            return;
        }
        var querys = await Query.findAll(resultadoCRM.id);
        var resultado = await Promise.all(querys.map(async (i) => {
            i.id_usuario = await ConsultationHistory.findDoctor(i.id_usuario);
            return i.id_usuario;
        }));
        var resultado1 = querys.map( function( i ) {
            if (i.atendida == 0){
                i.atendida = 'Pendente';
                return i.atentida;
            }
            else {
                i.atendida = 'Atendida';
                return i.atendida;
            }
        });
        res.json(querys);
    }

    async indexConsultas(req, res){
        var querys = await Query.findAllConsultas();
        res.json(querys);
    }

    async create(req, res){
        var {Unidade, Paciente, Medico, Data} = req.body;

        if (Unidade == undefined || Unidade == '' || Unidade == ' '){
            res.status(400);
            res.json({err: "A Unidade é inválida!"})
            return;
        }
        if (Paciente == undefined || Paciente == '' || Paciente == ' '){
            res.status(400);
            res.json({err: "O paciente é inválido!"});
        }
        if (Medico == undefined || Medico == '' || Medico == ' '){
            res.status(400);
            res.json({err: "O Medico é inválido!"});
        }
        if (Data == undefined || Data == '' || Data == ' '){
            res.status(400);
            res.json({err: "A data é inválido!"});
        }
        // Confere se o médico existe
        var resultadoCRM = await Doctor.findByCRM(Medico);
        if(resultadoCRM == undefined){
            res.status(400);
            res.json({err: "O médico não está cadastrado!"});
            return;
        }
        // Confere se o paciente existe
        var resultadoCPF = await Patient.findCPF(Paciente);
        if(resultadoCPF == undefined){
            res.status(400);
            res.json({err: "O paciente não está cadastrado!"});
            return;
        }
        // Confere se a Unidade Existe
        var resultadoUnidade = await RequestingUnit.findByNome(Unidade);
        if(resultadoUnidade == undefined){
            res.status(400);
            res.json({err: "A unidade não está cadastrada!"});
            return;
        }
        await Query.new(resultadoUnidade.id, resultadoCPF.id, resultadoCRM.id, Data, 0);
        res.status(200);
        res.send("Cadastrado!");
    }
    
    async edit(req, res){
        var {id, ID_Medico, ID_Paciente, ID_Unidade, descricao, data, exame, unidade} = req.body;
        if (id == undefined || id == '' || id == ' '){
            res.status(400);
            res.json({err: "Ocorreu 1 error ao alterar a consulta!"})
            return;
        }
        if (ID_Medico == undefined || ID_Medico == '' || ID_Medico == ' '){
            res.status(400);
            res.json({err: "Médico inválido!"})
            return;
        }
        if (ID_Paciente == undefined || ID_Paciente == '' || ID_Paciente == ' '){
            res.status(400);
            res.json({err: "Paciente inválido!"})
            return;
        }
        if (ID_Unidade == undefined || ID_Unidade == '' || ID_Unidade == ' '){
            res.status(400);
            res.json({err: "Unidade inválida!"})
            return;
        }
        if (descricao == undefined || descricao == '' || descricao == ' '){
            res.status(400);
            res.json({err: "Descrição Inválida!"})
            return;
        }
        if (data == undefined || data == '' || data == ' '){
            res.status(400);
            res.json({err: "Data inválida!"})
            return;
        }
        if (exame != undefined && exame != '' && exame != ' ' && unidade != undefined && unidade != '' && unidade != ' '){
            var resultUnidade = await PerformerUnit.findByNomeUnidade(unidade);
            var resultExame = await Exam.findByName(exame, resultUnidade.id);
            var resultQueue = await Queue.new(resultExame.id, ID_Paciente, resultUnidade.id);
        }
        await ConsultationHistory.new(ID_Medico, ID_Paciente, ID_Unidade, descricao, data, id);
        var result = await Query.update(id);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Atualizado");
            }else{
                res.status(406);
                res.send(result.err)
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }
}

module.exports = new QueryController();
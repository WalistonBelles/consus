var RequestingUnit = require("../models/RequestingUnit");

class RequestingUnitController{
    async index(req, res){
        var requestingUnit = await RequestingUnit.findAll();
        res.json(requestingUnit);
    }
    async create(req, res){
        var {dataDeRegistro, crm, cpf_paciente, id_Unidade} = req.body;

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

        await RequestingUnit.new(dataDeRegistro, resultadoCRM.id, resultadoCPF.id, );
        res.status(200);
        res.send("Cadastrado!");
    }
}

module.exports = new RequestingUnitController();
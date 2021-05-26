var Query = require("../models/Query");
var Doctor = require("../models/Doctor");
var User = require("../models/User");
var RequestingUnit = require("../models/RequestingUnit");

class QueryController{
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
        var resultadoCPF = await User.findCPF(Paciente);
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
}

module.exports = new QueryController();
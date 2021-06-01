var jwt = require("jsonwebtoken");
var secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

var Doctor = require("../models/Doctor");
var Specialty = require("../models/Specialty");
var User = require("../models/User");
var Query = require("../models/Query");

class DoctorController{
    async index(req, res){
        var doctors = await Doctor.findAll();
        res.json(doctors);
    }

    async listAllConsults(req, res){
        var {token} = req.body;
        if(token != undefined){
            try{
                var decoded = jwt.verify(token,secret);
                var medicoID = await Doctor.findByID(decoded.id)
                var resultado = await Query.findAll(medicoID.id, 5);
                var resultado1 = resultado.map( function( i ) {
                    if (i.atendida == 0){
                        i.atendida = 'Pendente';
                        return i.atentida;
                    }
                    else {
                        i.atendida = 'Atendida';
                        return i.atendida;
                    }
                });
                res.json(resultado);
            }catch(err){
                res.status(403);
                res.send("Você não está autenticado");
                return;
            }
        }else{
            res.status(403);
            res.send("Você não está autenticado");
            return;
        }
    }

    async create(req, res){
        var {crm, especialidade, cpf} = req.body;

        if (crm == undefined || crm == '' || crm == ' '){
            res.status(400);
            res.json({err: "Digite um CRM válido!"})
            return;
        }
        if (especialidade == undefined || especialidade == '' || especialidade == ' '){
            res.status(400);
            res.json({err: "Especialidade inválida!"})
            return;
        }
        if (cpf == undefined || cpf == '' || cpf == ' '){
            res.status(400);
            res.json({err: "Usuário válido!"})
            return;
        }
        // Confere se o CPF inserido é de 1 Usuário com cargo de Médico
        var resultadoCargo = await Doctor.findByCargo(cpf);
        if(resultadoCargo == undefined){
            res.status(400);
            res.json({err: "Este Usuário não é 1 Médico!"});
            return;
        }
        // Confere se a especialidade existe
        var resultadoEspecialidade = await Specialty.findByName(especialidade);
        if(resultadoEspecialidade == undefined){
            res.status(400);
            res.json({err: "Esta especialidade não existe!"});
            return;
        }
        // Confere se o médico já possui essa especialidade cadastrada
        var resultadoEspecialidade = await Doctor.findByCRMAndEspecialidade(crm, especialidade);
        if(resultadoEspecialidade != undefined){
            res.status(400);
            res.json({err: "Este médico já possui essa especialidade cadastrada!"});
            return;
        }
        // Confere se o médico já possui essa especialidade cadastrada
        var resultadoEspecialidade = await Doctor.findByCRMAndEspecialidade(crm, especialidade);
        if(resultadoEspecialidade != undefined){
            res.status(400);
            res.json({err: "Este médico já possui essa especialidade cadastrada!"});
            return;
        }
        // Confere se o CPF é de 1 usuário Válido
        var resultadoUsuario = await User.findCPF(cpf);
        if(resultadoUsuario == undefined){
            res.status(400);
            res.json({err: "Usuário com este CPF não encontrado!"});
            return;
        }
        // Insere a nova especialidade do Médico
        await Doctor.new(crm, especialidade, resultadoUsuario.id);
        res.status(200);
        res.send("Médico Cadastrado!");
    }
}

module.exports = new DoctorController();
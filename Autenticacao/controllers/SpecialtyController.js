var Specialty = require("../models/Specialty");

class SpecialtyController{
    async create(req, res){
        var {nome} = req.body;

        if (nome == undefined || nome == '' || nome == ' '){
            res.status(400);
            res.json({err: "O nome da especialidade é inválido!"})
            return;
        }
        // Confere se existe o código no banco
        var resultadoNome = await Specialty.findByName(nome);
        if(resultadoNome != undefined){
            res.status(400);
            res.json({err: "A especialidade já está cadastrada!"});
            return;
        }
        await Specialty.new(nome);
        res.status(200);
        res.send("Cadastrada!");
    }
}

module.exports = new SpecialtyController();
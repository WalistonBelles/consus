var Role = require("../models/Role");

class RoleController{
    async create(req, res){
        var {nome, codigo} = req.body;

        if (nome == undefined || nome == '' || nome == ' '){
            res.status(400);
            res.json({err: "O nome é inválido!"})
            return;
        }
        if (codigo == undefined || codigo == '' || codigo == ' '){
            res.status(400);
            res.json({err: "O código é inválido!"});
        }
        // Confere se existe o código no banco
        var resultadoCodigo = await Role.findByCodigo(codigo);
        if(resultadoCodigo != undefined){
            res.status(400);
            res.json({err: "O código já está cadastrado!"});
            return;
        }
        await Role.new(nome, codigo);
        res.status(200);
        res.send("Cadastrado!");
    }
}

module.exports = new RoleController();
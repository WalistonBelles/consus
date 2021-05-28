var PerformerUnit = require("../models/PerformerUnit");

class PerformerUnitController{
    async index(req, res){
        var PerformerUnit = await PerformerUnit.findAll();
        res.json(PerformerUnit);
    }
    async findUnit(req, res){
        var {Exame} = req.body;
        if (Exame == undefined || Exame == '' || Exame == ' '){
            res.status(400);
            res.json({err: "Exame inválido!"})
            return;
        }
        var unit = await PerformerUnit.findByNome(Exame);
        if(unit == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200)
            res.json(unit);
        }
    }
}

module.exports = new PerformerUnitController();
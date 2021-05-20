class ValidatorController{

    async index(req, res){
        res.send("APP EXPRESS!");
    }

    async validarEndereco(req, res){
        res.send("ok");
    }

}

module.exports = new ValidatorController();
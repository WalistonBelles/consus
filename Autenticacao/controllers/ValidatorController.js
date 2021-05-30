class ValidatorController{

    async index(req, res){
        res.send("APP EXPRESS!");
    }

    async validarPageAcess(role){
        if (role == 5){
            return '/Admin/Dashboard';
        } else if (role == 4){
            return '/Doctor/Dashboard';
        } else if (role == 3) {
            return 'Register';
        }else {
            return undefined;
        }
    }

}

module.exports = new ValidatorController();
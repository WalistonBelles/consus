var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var AdressController = require("../controllers/AdressController");

var secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

var bcrypt = require("bcrypt");

class UserController{
    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res){
        var id = req.params.id;
        var user = await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200)
            res.json(user);
        }
    }

    async create(req, res){
        var {email, nome, senha, nascimento, cpf, telefone, sus_card, rg, pais, cidade, cep, rua, bairro, numero, ponto_de_referencia} = req.body;
        // Valida Nome
        if(nome == undefined  || nome == '' || nome == ' '){
            res.status(400);
            res.json({err: "Usuário é inválido!", numer: 2})
            return;
        }
        // Valida Senha
        if(senha == undefined  || senha == '' || senha == ' ' || senha.lenght < 8){
            res.status(400);
            res.json({err: "A senha precisa conter no minimo 8 caracteres!", numer: 3})
            return;
        }
        // Valida Email
        if(email == undefined  || email == '' || email == ' '){
            res.status(400);
            res.json({err: "O e-mail é inválido!", numer: 1})
            return;
        }
        // Valida Data de Nascimento
        if (nascimento == undefined || nascimento == '' || nascimento == ' '){
            res.status(400);
            res.json({err: "Data de Nascimento inválida!", numer: 1})
            return;
        }
        // Valida CPF
        if (cpf == undefined || cpf == '' || cpf == ' '){
            res.status(400);
            res.json({err: "CPF inválido!", numer: 1})
            return;
        }
        // Valida Telefone
        if (telefone == undefined || telefone == '' || telefone == ' ' || telefone.lenght < 11){
            res.status(400);
            res.json({err: "Digite o seu DD+Número. Exemplo: 53999301161!", numer: 1})
            return;
        }
        // Valida Cartão do Sus
        if (sus_card == undefined || sus_card == '' || sus_card == ' ' || sus_card.lenght < 15){
            res.status(400);
            res.json({err: "Número do SUS inválido!", numer: 1})
            return;
        }
        // Valida RG
        if (rg == undefined || rg == '' || rg == ' '){
            res.status(400);
            res.json({err: "Número do RG inválido!", numer: 1})
            return;
        }

        var emailExists = await User.findEmail(email);
        var cpfExists = await User.findCPF(cpf);
        var rgExists = await User.findRG(rg);

        if(cpfExists){
            res.status(406);
            res.json({err: "O CPF já está cadastrado!"})
            return;
        }
        if(rgExists){
            res.status(406);
            res.json({err: "O RG já está cadastrado!"})
            return;
        }
        if(emailExists){
            res.status(406);
            res.json({err: "O e-mail já está cadastrado!"})
            return;
        }
        var result = await AdressController.create(pais, cidade, cep, rua, bairro, numero, ponto_de_referencia);
        if (result.err != undefined){
            console.log('Passou na linha 102' + result.err);
            res.status(400)
            res.json({err: result.err});
            return;
        }
        if(result.endereco != "Erro"){
            console.log('Passou na linha 108' + result.endereco);
            await User.new(nome, senha, nascimento, cpf, telefone, sus_card, rg, email, result.endereco);
        }else{
            console.log('Passou na linha 111');
            res.status(400)
            res.send(result.err);
        }
        res.status(200);
        res.send("Cadastrado com sucesso!");
    }

    async edit(req, res){
        var {id, name, role, email} = req.body;
        var result = await User.update(id,email,name,role);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo OK!");
            }else{
                res.status(406);
                res.send(result.err)
            }
        }
        else {
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }

    async remove(req, res){
        var id = req.params.id;
        var result = await User.delete(id);
        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }
        else {
            res.status(406);
            res.send(result.err);
        }
    }

    async recoverPassword(req, res){
        var {email} = req.body;
        var result = await PasswordToken.create(email);
        if(result.status){
           res.status(200);
           res.send("" + result.token);
        }
        else {
            res.status(406)
            res.send(result.err)
        }
    }

    async changePassword(req, res){
        var {token, password} = req.body;
        var isTokenValid = await PasswordToken.validate(token);
        if(isTokenValid.status){
            await User.changePassword(password,isTokenValid.token.user_id,isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada");
        }
        else {
            res.status(406);
            res.send("Token inválido!");
        }
    }

    async login(req, res){
        var {email, password } = req.body;
        var user = await User.login(email,password);
        if(user != undefined){
            var token = jwt.sign({ id: user.id, cargo: user.cargo }, secret);
            res.status(200);
            res.json({token: token, cargo: user.cargo});
        }
        else {
            res.status(406);
            res.json({status: false, err: "Usuário/Senha incorreto!"});
        }
    }
}

module.exports = new UserController();
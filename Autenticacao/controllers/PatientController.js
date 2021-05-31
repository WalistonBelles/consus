var Patient = require("../models/Patient");
var AdressController = require("../controllers/AdressController");

class PatientController{
    async index(req, res){
        var Patients = await Patient.findAll();
        res.json(Patients);
    }

    async findUser(req, res){
        var id = req.params.id;
        var patient = await Patient.findById(id);
        if(patient == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200)
            res.json(patient);
        }
    }

    async create(req, res){
        var {email, nome, nascimento, cpf, telefone, sus_card, rg, pais, cidade, cep, rua, bairro, numero, ponto_de_referencia} = req.body;
        // Valida Nome
        if(nome == undefined  || nome == '' || nome == ' '){
            res.status(400);
            res.json({err: "Usuário é inválido!", numer: 2})
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

        var emailExists = await Patient.findEmail(email);
        var cpfExists = await Patient.findCPF(cpf);
        var rgExists = await Patient.findRG(rg);

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
            res.status(400)
            res.json({err: result.err});
            return;
        }
        if(result.endereco != "Erro"){
            await Patient.new(nome, nascimento, cpf, telefone, sus_card, rg, email, result.endereco);
        }else{
            res.status(400)
            res.send(result.err);
        }
        res.status(200);
        res.send("Cadastrado com sucesso!");
    }
}

module.exports = new PatientController();
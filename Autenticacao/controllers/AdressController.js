var Adress = require("../models/Adress");

class AdressController{
    async create(pais, cidade, cep, rua, bairro, numero, ponto_de_referencia){
        try {
            if (pais == undefined || pais == '' || pais == ' '){
                var err = "O País é inválido!";
                return {status: 400, err: err};
            }
            if (cidade == undefined || cidade == '' || cidade == ' '){
                var err = "O nome da cidade é inválida!";
                return {status: 400, err: err};
            }
            if (cep == undefined || cep == '' || cep == ' '){
                var err = "O CEP é inválido!";
                return {status: 400, err: err};
            }
            if (rua == undefined || rua == '' || rua == ' '){
                var err = "Rua inválida!";
                return {status: 400, err: err};
            }
            if (bairro == undefined || bairro == '' || bairro == ' '){
                var err = "Bairro inválido!";
                return {status: 400, err: err};
            }
            if (numero == undefined || numero == '' || numero == ' '){
                var err = "Número inválido!";
                return {status: 400, err: err};
            }
            if (ponto_de_referencia == undefined || ponto_de_referencia == '' || ponto_de_referencia == ' '){
                ponto_de_referencia = 'Sem referência';
            }
            // Registra no banco
            await Adress.new(pais, cidade, cep, rua, bairro, numero, ponto_de_referencia);
            var endereco = await Adress.findByNumero(cep, numero);
            if (endereco != undefined){
                return {status: true, endereco: endereco.id};
            }else {
                return {status: true, endereco: "Erro"};
            }
            return;
        }
        catch(err){
            console.log(err);
            return undefined;
        }
    }
}

module.exports = new AdressController();

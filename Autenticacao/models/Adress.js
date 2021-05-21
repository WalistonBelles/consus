var knex = require("../database/connection");
class Adress {
    // Adicionar novo cargo
    async new(pais, cidade, cep, rua, bairro, numero, ponto_de_referencia){
        try{
            await knex.insert({pais, cidade, cep, rua, bairro, numero, ponto_de_referencia}).table("endereco");
        }catch(err){
            console.log(err);
        }
    }
    async findByNumero(cep, numero){
        try{
            var result = await knex.select(["id"]).whereRaw('`cep` = ' + cep + ' AND `numero` = ' + numero).table("endereco");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }
    }
}

module.exports = new Adress();
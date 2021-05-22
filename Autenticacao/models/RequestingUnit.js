var knex = require("../database/connection");
class RequestingUnit {
    // Retorna todas as unidades solicitantes cadastradas
    async findAll(){
        try{
            var result = await knex.select(["id","nome"]).table("unidade solicitante");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    // Busca no banco se a Unidade Solicitante existe
    async findByNome(nome){
        try{
            var result = await knex.select(["id","nome"]).where({nome:nome}).table("unidade solicitante");
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

module.exports = new RequestingUnit();
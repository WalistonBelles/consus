var knex = require("../database/connection");
class Specialty {
    // Retorna todas as especialidades cadastradas
    async findAll(){
        try{
            var result = await knex.select(["id","nome"]).table("especialidade");
            console.log(result);
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    // Adicionar nova especialidade
    async new(nome){
        try{
            await knex.insert({nome}).table("especialidade");
        }catch(err){
            console.log(err);
        }
    }
    // Buscar no banco se a especialidade já existe
    async findByName(name){
        try{
            var result = await knex.select(["id","nome"]).where({nome:name}).table("especialidade");
            
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

module.exports = new Specialty();
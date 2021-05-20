var knex = require("../database/connection");
class Role {
    // Adicionar novo cargo
    async new(nome,codigo){
        try{
            await knex.insert({nome, codigo}).table("cargo");
        }catch(err){
            console.log(err);
        }
    }
    // Buscar no banco se o cargo já existe
    async findByCodigo(codigo){
        try{
            var result = await knex.select(["id","nome","codigo"]).where({codigo:codigo}).table("cargo");
            
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

module.exports = new Role();
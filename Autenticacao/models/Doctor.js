var knex = require("../database/connection");
class Doctor {
    async findAll(){
        try{
            var result = await knex.select(["id","crm","especialidade","id_usuario"]).table("medico");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    // Adiciona novo médico
    async new(crm, especialidade, id_usuario){
        try{
            await knex.insert({crm, especialidade, id_usuario}).table("medico");
        }catch(err){
            console.log(err);
        }
    }
    // Busca no banco se o crm já está cadastrado
    async findByCRM(crm){
        try{
            var result = await knex.select(["id","crm"]).where({crm:crm}).table("medico");
            
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
    // Busca no banco se o médico já possui a especialidade cadastrada
    async findByCRMAndEspecialidade(crm, especialidade){
        try{
            var result = await knex.select(["id"]).whereRaw('`crm` = "' + crm + '" AND `especialidade` = "' + especialidade + '"').table("medico");
            
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
    // Busca no banco se o usuário é um médico
    async findByCargo(cpf){
        try{
            var result = await knex.select(["id"]).whereRaw('`cpf` = "' + cpf + '" AND `cargo` = 4').table("usuario");
            
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

module.exports = new Doctor();
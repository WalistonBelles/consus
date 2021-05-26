var knex = require("../database/connection");
class Query {
    // Adicionar novo cargo
    async new(id_Unidade, id_Paciente, id_Medico, Data, Atendida){
        try{
            await knex.insert({id_Unidade, id_Paciente, id_Medico, Data, Atendida}).table("consulta");
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new Query();
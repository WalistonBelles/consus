var knex = require("../database/connection");
class Queue {
    // Adicionar novo Paciente na Fila de Espera
    async new(id_Exame, id_Paciente, id_Unidade){
        try{
            await knex.insert({id_Exame, id_Paciente, id_Unidade}).table("fila_de_espera");
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new Queue();
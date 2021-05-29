var knex = require("../database/connection");
class Schedule {
    // Adicionar novo registro na Agenda
    async new(dataDeRegistro, id_medico, id_paciente, id_unidade){
        try{
            await knex.insert({dataDeRegistro, id_medico, id_paciente, id_unidade}).table("agenda");
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new Schedule();
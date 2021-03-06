var knex = require("../database/connection");
class ConsultationHistory {
    // Retorna todos os históricos de consulta do sistema
    async findAllConsultas(){
        try{
            var result = await knex.select(["id"]).table("historico_de_consultas");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    // Retorna todos os históricos de consulta do paciente
    async findAll(id_paciente){
        try{
            var result = await knex.
            select(["paciente.nome as unome","medico.id_usuario", "unidade solicitante.nome", "historico_de_consultas.descricao", "historico_de_consultas.data"])
            .where({ID_Paciente:id_paciente})
            .innerJoin('paciente', 'historico_de_consultas.ID_Paciente', 'paciente.id')
            .innerJoin('medico', 'historico_de_consultas.ID_Medico', 'medico.id')
            .innerJoin('unidade solicitante', 'historico_de_consultas.ID_Unidade', 'unidade solicitante.id')
            .as('paciente')
            .table("historico_de_consultas");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    async findDoctor(id_medico){
        try{
            var result = await knex.select(["nome"]).where({id:id_medico}).table('usuario');
            return result[0].nome;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    // Registra uma nova Consulta no histórico do Paciente
    async new(ID_Medico, ID_Paciente, ID_Unidade, descricao, data, id_consulta){
        try{
            await knex.insert({ID_Medico, ID_Paciente, ID_Unidade, descricao, data, id_consulta}).table("historico_de_consultas");
        }catch(err){
            console.log(err);
        }
    } 
}

module.exports = new ConsultationHistory();
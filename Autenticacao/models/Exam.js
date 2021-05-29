var knex = require("../database/connection");
class Exam {
    // Retorna todos os exames cadastrados
    async findAll(){
        try{
            var result = await knex.select(["id","nome", "id_unidade"]).table("exame");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    // Retorna todos o exame pelo nome
    async findByName(nome, id_unidade){
        try{
            var result = await knex
            .select(["exame.id"])
            .whereRaw('`unidade executante`.`id` = ' + id_unidade + ' AND `exame`.`nome` = "' + nome + '"')
            .innerJoin('unidade executante', 'exame.id_Unidade', 'unidade executante.id')
            .table("exame");
            return result[0];
        }catch(err){
            console.log(err);
            return [];
        }
    }
}

module.exports = new Exam();
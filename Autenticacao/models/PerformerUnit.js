var knex = require("../database/connection");
class PerformerUnit {
    // Retorna todas as unidades solicitantes cadastradas
    async findAll(){
        try{
            var result = await knex.select(["id","nome"]).table("unidade executante");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    // Retorna todas a unidade solicitante baseada no ID
    async findById(id){
        try{
            var result = await knex.select(["id","nome"]).where({id:id}).table("unidade executante");
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
    // Retorna todas a unidade solicitante baseada no ID
    async findByNome(nome){
        try{
            var result = await knex
            .select(["unidade executante.id","unidade executante.nome"])
            .whereRaw('exame.nome = "' + nome + '"')
            .innerJoin('unidade executante', 'exame.ID_Unidade', 'unidade executante.id')
            .table("exame");
            if(result.length > 0){
                return result;
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }
    }
    // Retorna todas a unidade solicitante baseada no ID
    async findByNomeUnidade(nome){
        try{
            var result = await knex.select(["id"]).where({nome: nome}).table("unidade executante");
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
module.exports = new PerformerUnit();
var knex = require("../database/connection");
class Query {
    // Retorna todas as unidades solicitantes cadastradas
    async findAllConsultas(){
        try{
            var result = await knex.select(["id"]).where({atendida: 0}).table("consulta");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    // Retorna todos as consulta que precisam ser atendidas pelo Médico
    async findAll(id_medico){
        try{
            var result = await knex.
            select(["consulta.id as conid", "unidade solicitante.nome", "consulta.id_Unidade as unid", "consulta.id_Medico as medid", "paciente.nome as unome", "consulta.id_Paciente as pacid", "medico.id_usuario", "consulta.data", "consulta.atendida"])
            .whereRaw('`id_Medico` = ' + id_medico + ' AND `atendida` = 0')
            .innerJoin('unidade solicitante', 'consulta.id_Unidade', 'unidade solicitante.id')
            .innerJoin('paciente', 'consulta.id_Paciente', 'paciente.id')
            .innerJoin('medico', 'consulta.id_Medico', 'medico.id')
            .as('paciente')
            .as('unidade solicitante')
            .as('medico')
            .as('consulta')
            .table("consulta");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    // Adicionar novo cargo
    async new(id_Unidade, id_Paciente, id_Medico, Data, Atendida){
        try{
            await knex.insert({id_Unidade, id_Paciente, id_Medico, Data, Atendida}).table("consulta");
        }catch(err){
            console.log(err);
        }
    }

    // Retorna uma consulta baseado no ID
    async findById(id){
        try{
            var result = await knex.select(["id", "atendida"]).where({id:id}).table("consulta");
            
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

    // Alterar para atendido a consulta
    async update(id){
        var query = await this.findById(id);
        if(query != undefined){
            var editQuery = {};
            if(query.atendida != undefined){
                editQuery.atendida = 1;
            }
            try{
                await knex.update(editQuery).where({id: id}).table("consulta");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        }else{
            return {status: false,err: "A consulta não existe!"}
        }
    }
}

module.exports = new Query();
var knex = require("../database/connection");

class Patient{
    async new(nome, nascimento, cpf, telefone, sus_card, rg, email, endereco){
        try{
            await knex
            .insert({nome, nascimento, cpf, telefone, sus_card, rg, email, endereco})
            .table("paciente");
        }catch(err){
            console.log(err);
        }
    } 

    async findEmail(email){
        try{
            var result = await knex.select(["id","email", "nome"]).where({email:email}).table("paciente");
            
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

    async findByEmail(email){
        try{
            var result = await knex.select(["id","email", "nome"]).where({email:email}).table("paciente");
            
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

    async findCPF(cpf){
        try{
            var result = await knex.select(["id","cpf"]).where({cpf:cpf}).table("paciente");
            
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

    async findRG(rg){
        try{
            var result = await knex.select(["id","rg"]).where({rg:rg}).table("paciente");
            
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

module.exports = new Patient();
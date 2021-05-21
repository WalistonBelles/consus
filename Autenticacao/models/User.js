var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User{

    async findAll(){
        try{
            var result = await knex.select(["id","email","role","name"]).table("usuario");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","email","role","name"]).where({id:id}).table("usuario");
            
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
            var result = await knex.select(["id","email","password","role","name"]).where({email:email}).table("usuario");
            
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

    async new(nome,senha,nascimento,cpf, telefone, sus_card, rg, email, endereco){
        try{
            var hash = await bcrypt.hash(senha, 10);
            var cargo = 'Paciente';
            await knex.insert({nome, senha: hash, nascimento, cpf, telefone, sus_card, rg, email, cargo, endereco}).table("usuario");
        }catch(err){
            console.log(err);
        }
    }   

    async findEmail(email){
        try{
            var result = await knex.select("*").from("usuario").where({email: email});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }

    async update(id,email,name,role){

        var user = await this.findById(id);

        if(user != undefined){

            var editUser = {};

            if(email != undefined){ 
                if(email != user.email){
                   var result = await this.findEmail(email);
                   if(result == false){
                        editUser.email = email;
                   }else{
                        return {status: false,err: "O e-mail já está cadastrado"}
                   }
                }
            }

            if(name != undefined){
                editUser.name = name;
            }

            if(role != undefined){
                editUser.role = role;
            }

            try{
                await knex.update(editUser).where({id: id}).table("usuario");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "O usuário não existe!"}
        }
    }

    async delete(id){
        var user = await this.findById(id);
        if(user != undefined){

            try{
                await knex.delete().where({id: id}).table("usuario");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O usuário não existe, portanto não pode ser deletado."}
        }
    }

    async changePassword(newPassword,id,token){
        var hash = await bcrypt.hash(newPassword, 10);
        await knex.update({password: hash}).where({id: id}).table("usuario");
        await PasswordToken.setUsed(token);
    }
}

module.exports = new User();
<template>
    <div>
        <h2 style="color: #122c77;">Registro de usuário!</h2>    
        <hr>
        <card>
            <form>
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <div class="form-row">
                    <base-input class="col-md-6" type="text" label="Nome" placeholder="Nome do usuário" v-model="name"/>
                    <base-input class="col-md-6" type="password" label="Password" placeholder="***********" v-model="password"/>
                    <base-input class="col-md-6" type="email" label="Email" placeholder="Email" v-model="email"/>
                </div>
                <div class="form-row">
                    <datetime input-class="form-control" style="position: relative; top: 25px;" class="col-md-3" type="datetime" label="Data de Nascimento" placeholder="Data de Nascimento" v-model="dataNascimento"></datetime>
                    <base-input class="col-md-4" type="text" label="Número do Cpf" placeholder="Cpf" v-model="cpf"/>
                    <base-input class="col-md-4" type="text" label="Telefone Para Contato" placeholder="Telefone" v-model="telefone"/>
                    <base-input class="col-md-6" type="text" label="Cartão do Sus" placeholder="Cartão do Sus" v-model="sus_card"/>
                    <base-input class="col-md-6" type="text" label="Número da Identidade" placeholder="Identidade" v-model="rg"/>
                </div>
                <div class="form-row">
                    <base-input class="col-md-3" label="Selecione o Pais">
                            <select id="inputState" class="form-control" v-model="pais">
                                <option>Brasil</option>
                                <option>Uruguai</option>
                                <option>Estados Unidos</option>
                            </select>
                    </base-input>
                    <base-input class="col-md-3" type="text" label="Cidade" placeholder="Cidade" v-model="cidade"/>
                    <base-input class="col-md-3" type="text" label="CEP" placeholder="CEP" v-model="cep"/>
                    <base-input class="col-md-3" type="text" label="Rua" placeholder="Rua" v-model="rua"/>
                    <base-input class="col-md-4" type="text" label="Bairro" placeholder="Bairro" v-model="bairro"/>
                    <base-input class="col-md-4" type="text" label="Número" placeholder="Número" v-model="numero"/>
                    <base-input class="col-md-4" type="text" label="Ponto de Referência" placeholder="Ponto de Referência" v-model="ponto_de_referencia"/>
                </div>
                <base-button class="animation-on-hover" type="success" @click="register">Cadastrar</base-button>
            </form>
        </card>
    </div>    
</template>

<script>
import BaseAlert from "@/components/BaseAlert";
import BaseButton from "@/components/BaseButton";
import api from '@/services/api';
export default {
    created(){
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        api.get("/user",req).then(res => {
            this.users = res.data;
        }).catch(err => {
            this.$router.push({name: 'nopermission'});
        })
    },
    data(){
        return {
            users: [],
            name: '',
            password: '',
            email: '',
            dataNascimento: '', 
            cpf: '', 
            telefone: '', 
            sus_card: '',
            rg: '',
            pais: 'Brasil',
            cidade: '', 
            cep: '', 
            rua: '', 
            bairro: '', 
            numero: '', 
            ponto_de_referencia: '',
            cargo: 1,
            endereco: 1,
            error: undefined,
        }
    },
    components: {
        BaseAlert,
        BaseButton
    },
    methods: {
        register(){
            var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
            api.post("/user", req, {
                nome: this.name,
                senha: this.password,
                nascimento: this.dataNascimento,
                cpf: this.cpf,
                telefone: this.telefone,
                sus_card: this.sus_card,
                rg: this.rg,
                email: this.email,
                pais: this.pais,
                cidade: this.cidade,
                cep: this.cep,
                rua: this.rua,
                bairro: this.bairro,
                numero: this.numero,
                ponto_de_referencia: this.ponto_de_referencia,
            }).then(res => {
                console.log(res);
                this.$router.push({name: 'dashboard'});
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        }
    }
}
</script>

<style scoped>

</style>
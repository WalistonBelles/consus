<template>
    <div>
        <h2>Cadastro de Cargos!</h2>    
        <hr>
        <card>
            <form>
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <div class="form-row">
                    <base-input class="col-md-6" type="text" label="CRM do Médico" placeholder="CRM do Médico" v-model="crm"/>
                    <base-input class="col-md-6" type="text" label="CPF do Paciente" placeholder="CPF do Paciente" v-model="cpf_paciente"/>
                    <base-input class="col-md-3" label="Selecione a Unidade">
                      <select id="inputState" class="form-control" v-model="nome_unidade">
                        <option selected>Selecionar...</option>
                        <option v-for="requesting in requestings" :key="requesting.id">{{requesting.nome}}</option>
                      </select>
                    </base-input>
                    <base-input class="col-md-6" type="text" label="Data do Registro" placeholder="Data do Registro" v-model="dataDeRegistro"/>
                </div>
                <base-button class="animation-on-hover" type="success" @click="register">Cadastrar</base-button>
            </form>
        </card>
    </div>    
</template>

<script>
import BaseAlert from "../components/BaseAlert";
import BaseButton from "../components/BaseButton";
import axios from 'axios';
export default {
  created(){
        axios.get("http://localhost:3000/requestingUnit").then(res => {
            console.log(res);
            this.requestings = res.data;
        }).catch(err => {
            console.log("Deu Erro");
            console.log(err);
        })
    },
    data(){
        return {
            requestings: [],
            dataDeRegistro: '',
            cpf_paciente: '',
            crm: '',
            nome_unidade: '',
            error: undefined,
        }
    },
    components: {
        BaseAlert,
        BaseButton
    },
    methods: {
        register(){
            axios.post("http://localhost:3000/schedule",{
                dataDeRegistro: this.dataDeRegistro,
                crm: this.crm,
                cpf_paciente: this.cpf_paciente,
                nome_unidade: this.nome_unidade
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
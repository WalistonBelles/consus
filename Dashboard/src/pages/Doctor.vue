<template>
    <div>
        <h2>Cadastro de Especialidades!</h2>    
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
                    <base-input class="col-md-6" type="text" label="CPF do Médico" placeholder="CPF do Médico" v-model="cpf"/>
                    <base-input class="col-md-3" label="Selecione a Especialidade">
                      <select id="inputState" class="form-control" v-model="especialidade">
                        <option selected>Selecionar...</option>
                        <option v-for="speciality in specialitys" :key="speciality.id">{{speciality.nome}}</option>
                      </select>
                    </base-input>
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
        axios.get("http://localhost:3000/specialty").then(res => {
            console.log("Nao Deu Erro");
            console.log(res);
            this.specialitys = res.data;
        }).catch(err => {
            console.log("Deu Erro");
            console.log(err);
        })
    },
    data(){
        return {
            specialitys: [],
            crm: '',
            especialidade: '',
            cpf: '',
            error: undefined,
        }
    },
    components: {
        BaseAlert,
        BaseButton
    },
    methods: {
        register(){
            axios.post("http://localhost:3000/doctor",{
                crm: this.crm,
                especialidade: this.especialidade,
                cpf: this.cpf
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
<template>
    <div>
        <h2 style="color: #122c77;">Cadastro de Consulta!</h2>    
        <hr>
        <card>
            <form>
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <div class="form-row">
                    <base-input class="col-md-6" type="text" label="CRM do Médico" placeholder="CRM do Médico" v-model="Medico"/>
                    <base-input class="col-md-6" type="text" label="CPF do Paciente" placeholder="CPF do Paciente" v-model="Paciente"/>
                    <base-input class="col-md-3" label="Selecione a Unidade">
                      <select id="inputState" class="form-control" v-model="Unidade">
                        <option selected>Selecionar...</option>
                        <option v-for="requesting in requestings" :key="requesting.id">{{requesting.nome}}</option>
                      </select>
                    </base-input>
                    <base-input class="col-md-6" type="text" label="Data do Registro" placeholder="Data do Registro" v-model="Data"/>
                </div>
                <base-button class="animation-on-hover" type="success" @click="register">Cadastrar</base-button>
            </form>
        </card>
    </div>    
</template>

<script>
import BaseAlert from "../components/BaseAlert";
import BaseButton from "../components/BaseButton";
import api from '@/services/api';
export default {
    created(){
        api.get("/requestingUnit").then(res => {
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
            Unidade: '',
            Paciente: '', 
            Medico: '', 
            Data: '',
            error: undefined,
        }
    },
    components: {
        BaseAlert,
        BaseButton
    },
    methods: {
        register(){
            api.post("/query",{
                Unidade: this.Unidade,
                Paciente: this.Paciente, 
                Medico: this.Medico, 
                Data: this.Data
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
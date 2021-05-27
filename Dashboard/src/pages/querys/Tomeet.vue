<template>
    <div>
        <h2 style="color: #122c77;">Atendimento de Consulta!</h2>    
        <hr>
        <card>
            <div v-if="error != undefined">
                <base-alert type="warning">
                    <strong>Alerta!</strong> {{error}}!
                </base-alert>
            </div>
            <base-input class="col-md-6" type="text" label="Nome do Paciente" placeholder="Nome do Paciente" v-model="name"/>
            <base-input class="col-md-6" type="field" label="Data" placeholder="Data" size="50" v-model="data"/>
            <base-input class="col-md-6" type="field" label="Prescrição Médica" placeholder="Prescrição Médica" size="50" v-model="descricao"/>
            <hr>
            <base-button type="success" @click="update">Concluir Consulta</base-button>
        </card>
    </div>    
</template>

<script>
import BaseAlert from "../../components/BaseAlert";
import BaseButton from "../../components/BaseButton";
import BaseTable from "../../components/BaseTable";
import axios from 'axios';
export default {
    created(){
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get("http://localhost:3000/user/" + this.$route.params.paciente_id, req)
        .then(res => {
            this.name = res.data.nome;
        }).catch(err => {
            console.log(err.response);
            this.$router.push({name: 'dashboard'});
        })
    },
    data(){
        return {
            name: '',
            descricao: '',
            id: -1,
            error: undefined,
            ID_Medico: '', 
            ID_Paciente: '', 
            ID_Unidade: '',
            data: ''
        }
    },
    components: {
        BaseAlert,
        BaseButton,
        BaseTable
    },
    methods: {
        update(){
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.put("http://localhost:3000/query",{
                id: this.$route.params.id,
                ID_Medico: this.$route.params.medico_id, 
                ID_Paciente: this.$route.params.paciente_id, 
                ID_Unidade: this.$route.params.unidade_id, 
                descricao: this.descricao, 
                data: this.data
            }, req).then(res => {
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
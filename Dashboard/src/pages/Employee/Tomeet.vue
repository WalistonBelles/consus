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
            <base-button simple type="success" @click="exameModal = true, unidadeProcura()">Solicitar Exame</base-button>
            <modal :show.sync="exameModal"
                body-classes="p-0"
                modal-classes="modal-sm"
                id="exameModal"
                :show-close="true">
              <card type="secondary"
                    header-classes="bg-white pb-8"
                    body-classes="px-lg-8 py-lg-8"
                    class="border-0 mb-0">
                  <template>
                    <div class="text-center text-muted mb-4">
                        <small>Selecione o Exame e a Unidade a Realizar o mesmo!</small>
                    </div>
                    <base-input class="col-md-6" label="Selecione o Exame">
                      <select id="inputState" class="form-control" v-model="exame" @change="unidadeProcura()">
                        <option :selected="true">Selecionar...</option>
                        <option v-for="exam in exams" :key="exam.id" :selected="exame === exam">{{exam.nome}}</option>
                      </select>
                    </base-input>
                    <base-input class="col-md-6" label="Selecione a Unidade">
                      <select id="inputState" :required="true" class="form-control" v-model="unidade">
                        <option :selected ="true">Selecionar...</option>
                        <option v-for="unit in units" :key="unit.id" :selected="unidade === unit">{{unit.nome}}</option>
                      </select>
                    </base-input>
                  </template>
              </card>
            </modal>
            <base-button type="success" @click="update">Concluir Consulta</base-button>
        </card>
    </div>    
</template>

<script>
import BaseAlert from "../../components/BaseAlert";
import BaseButton from "../../components/BaseButton";
import BaseTable from "../../components/BaseTable";
import { CollapseTransition } from 'vue2-transitions';
import Modal from '@/components/Modal';
import api from '@/services/api';
export default {
    created(){
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        api.get("/confirmEmployee",req).then(res => {
            this.users = res.data;
        }).catch(err => {
            console.log(err);
            this.$router.push({name: 'nopermission'});
        })
        api.get("/exam")
        .then(res => {
            this.exams = res.data;
            this.exame = this.exams[0].nome;
        }).catch(err => {
            console.log("Deu Erro");
            console.log(err);
        })
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        api.get("/patient/" + this.$route.params.paciente_id, req)
        .then(res => {
            this.name = res.data.nome;
        }).catch(err => {
            console.log(err.response);
            this.$router.push({name: 'dashboard'});
        })
    },
    data(){
        return {
            users: [],
            exams: [],
            exame: '',
            units: [],
            unidade: '',
            name: '',
            descricao: '',
            id: -1,
            error: undefined,
            ID_Medico: '', 
            ID_Paciente: '', 
            ID_Unidade: '',
            exameModal: false,
            data: ''
        }
    },
    components: {
        BaseAlert,
        BaseButton,
        BaseTable,
        CollapseTransition,
        Modal
    },
    methods: {
        onChange:function(event){
            unidadeProcura();
        },
        unidadeProcura(){
            api.post("/performerUnit",{
                Exame: this.exame
            }).then(res => {
                this.units = res.data;
                this.unidade = this.units[0].nome;
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        },
        update(){
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            api.put("/query",{
                id: this.$route.params.id,
                ID_Medico: this.$route.params.medico_id, 
                ID_Paciente: this.$route.params.paciente_id, 
                ID_Unidade: this.$route.params.unidade_id, 
                descricao: this.descricao, 
                data: this.data,
                exame: this.exame,
                unidade: this.unidade
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
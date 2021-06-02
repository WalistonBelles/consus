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
                    <base-input  @click="exameModal = true" class="col-md-3" type="text" label="Selecione a data" placeholder="Selecione a data" v-model="dataA"/>
                    <modal :show.sync="exameModal" body-classes="p-0" modal-classes="modal-body-centered" id="exameModal" :show-close="true">
                        <card type="secondary" header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0 mb-0">
                            <div>
                                <div class="text-center text-muted mb-12">
                                    <small>Selecione o Exame e a Unidade a Realizar o mesmo!</small>
                                </div>
                                <div class="btn-wrapper text-center">
                                    <datetime value-zone="UTC-03:00" input-class="form-control" class="col-md-6" type="date" label="Data" placeholder="Data" v-model="dataNascimento"></datetime>
                                    <base-button class="animation-on-hover" type="success" @click="timeslotsa">Listar Horários</base-button>
                                    <div v-if="timeslots.length > 0">
                                        Horários disponíveis para: {{dia}}/{{mes}}/{{ano}}
                                        <table class="table table-hover" v-if="timeslots.length > 0">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="text-center">Hora de Entrada</th>
                                                    <th scope="col" class="text-center">Agendar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="timeslot in timeslots" :key="timeslot.startTime">
                                                    <td class="text-center">{{timeslot.startTime}}</td>
                                                    <td class="text-center">
                                                        <base-button simple type="success" size="sm" @click="corrigirData(timeslot.startTime), exameModal = false">
                                                                Escolher
                                                        </base-button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </card>
                    </modal>
                </div>
                <base-button class="animation-on-hover" type="success" @click="register">Cadastrar</base-button>
            </form>
        </card>
    </div>    
</template>

<script>
import BaseAlert from "../../components/BaseAlert";
import BaseButton from "../../components/BaseButton";
import { CollapseTransition } from 'vue2-transitions';
import Modal from '@/components/Modal';
import api from '@/services/api';
import axios from 'axios';
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
            ano: '',
            mes: '',
            dia: '',
            hora: '',
            minuto: '',
            dataA: '',
            timeslots: [],
            users: [],
            requestings: [],
            Unidade: '',
            Paciente: '', 
            Medico: '', 
            Data: '',
            exameModal: false,
            error: undefined,
        }
    },
    components: {
        BaseAlert,
        BaseButton,
        CollapseTransition,
        Modal
    },
    methods: {
        // Pega o horário escolhido
        corrigirData(horaH){
            this.hora = horaH.substring(1, 3);
            this.minuto = horaH.substring(4, 6);
            this.dataA = this.hora + ":" + this.minuto + " " + this.dia + "/" + this.mes + "/" + this.ano;
        },
        timeslotsa(){
            this.ano = this.dataNascimento.substring(0, 4);
            this.mes = this.dataNascimento.substring(5, 7);
            this.dia = this.dataNascimento.substring(8, 10);
            axios.get("http://localhost:8080/timeslots?year="+this.ano+"&month="+this.mes+"&day="+this.dia)
                .then(res => {
                    if(res.data.success != false){
                        this.timeslots = res.data.timeslots;
                        this.error = undefined;
                    }
                    else{
                        this.error = res.data.message;
                        this.timeslots = [];
                    }
                }).catch(err => {
                    var msgErro = err.response.data.err;
                    this.error = msgErro;
                    this.timeslots = [];
                })
            },
        register(){
            api.post("/query",{
                Unidade: this.Unidade,
                Paciente: this.Paciente, 
                Medico: this.Medico, 
                Data: this.dataA
            }).then(res => {
                console.log(res);
                // Registra no Google Agendas
                api.post("/consultas", {
                    ano: this.ano, 
                    mes: this.mes, 
                    dia: this.dia,
                    hora: this.hora,
                    minuto: this.minuto
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    var msgErro = err.response.data.err;
                    this.error = msgErro;
                })
                // Retorna para área de 
                this.$router.push({name: 'employee_dashboard'});
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
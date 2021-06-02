<template>
    <div style="text-align: center;">
        <h2 style="color: #122c77;">Login</h2>    
        <hr>
        <card>
            <form>
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <datetime value-zone="UTC-03:00" input-class="form-control" class="col-md-3" type="date" label="Data de Nascimento" placeholder="Data de Nascimento" v-model="dataNascimento"></datetime>
                <base-button class="animation-on-hover" type="success" @click="timeslotsa">Pesquisar</base-button>
            </form>
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
                                <router-link :to="{name: 'agendarconsulta', params:{year: ano, month: mes, days: dia, startTime: timeslot.startTime}}">
                                    <base-button simple type="success" size="sm">
                                        Agendar
                                    </base-button>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
    </div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert";
import BaseButton from "@/components/BaseButton";
import BaseTable from "@/components/BaseTable";
import axios from 'axios';
export default {
        data(){
            return {
                ano: '',
                mes: '',
                dia: '',
                dataNascimento: '',
                timeslots: [],
                error: undefined,
            }
        },
        components: {
            BaseAlert,
            BaseButton,
            BaseTable
        },
        methods: {
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
            }
        }
    }
</script>

<style scoped>

</style>
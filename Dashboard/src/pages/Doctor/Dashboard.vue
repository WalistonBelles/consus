<template>
    <div style="text-align: center;">
        <h2 style="color: #122c77;">ConSUS - Sistema</h2>   
        <hr>
        <div class="row">
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Histórico Paciente</div>
                    <div class="card-body">
                        <p class="card-text">Histórico de Paciente.</p>
                    </div>
                    <div class="card-footer"><a href="#/employee/consultationHistory"><base-button type="success"><i class="tim-icons icon-simple-add"></i> Historico</base-button></a></div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Consultas</div>
                    <div class="card-body">
                        <p class="card-text">Consultas</p>
                    </div>
                    <div class="card-footer"><a href="#/doctor/answerInquiry"><base-button type="success"><i class="tim-icons icon-simple-add"></i> Consultas</base-button></a></div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12">
            <div class="card">
                <div class="card-header">Próximas 5 Consultas</div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Paciente</th>
                            <th scope="col">Data</th>
                            <th scope="col" class="text-center">Status</th>
                            <th scope="col" class="text-center">Operações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="consult in consults" :key="consult.id">
                            <td>{{consult.unome}}</td>
                            <td>{{consult.data}}</td>
                            <td class="text-center"><p class="text-danger">{{consult.atendida}}</p></td>
                            <td class="text-center">
                                <router-link :to="{name: 'tomeet', params:{id: consult.conid, paciente_id: consult.pacid, unidade_id: consult.unid, medico_id: consult.medid}}">
                                    <base-button simple type="primary">Atender</base-button>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>    
</template>

<script>
import api from '@/services/api';

export default {
    created(){
        api.post("/doctorsConsults", {
            token: localStorage.getItem('token')
        }).then(res => {
            this.consults = res.data;
        }).catch(err => {
            var msgErro = err.response.data.err;
            this.error = msgErro;
        })
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        api.get("/confirmDoctor",req).then(res => {
            this.users = res.data;
        }).catch(err => {
            console.log(err);
            this.$router.push({name: 'nopermission'});
        })
    },
    data(){
        return {
            users: [],
            consults: [],
            error: undefined,
        }
    }
}
</script>

<style scoped>

</style>
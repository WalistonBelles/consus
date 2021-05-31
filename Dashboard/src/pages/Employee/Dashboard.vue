<template>
    <div style="text-align: center;">
        <h2 style="color: #122c77;">ConSUS - Sistema</h2>   
        <hr>
        <div class="row">
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Pacientes</div>
                    <div class="card-body">
                        <p class="card-text">Cadastrar um novo Paciente.</p>
                        <div class="card-footer"><a href="#/employee/newpatient"><base-button type="success"><i class="tim-icons icon-single-02"></i> Paciente</base-button></a></div>
                    </div>
                </div>
            </div>
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
                    <div class="card-header">Agenda</div>
                    <div class="card-body">
                        <p class="card-text">Cadastrar nova consulta.</p>
                    </div>
                    <div class="card-footer"><a href="#/employee/schedule"><base-button type="success"><i class="tim-icons icon-simple-add"></i> Agenda</base-button></a></div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import api from '@/services/api';

export default {created(){
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
    },
    data(){
        return {
            users: [],
            error: undefined,
        }
    }
}
</script>

<style scoped>

</style>
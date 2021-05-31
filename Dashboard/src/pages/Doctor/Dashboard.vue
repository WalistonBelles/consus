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
        </div>
    </div>    
</template>

<script>
import api from '@/services/api';

export default {
    created(){
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
            error: undefined,
        }
    }
}
</script>

<style scoped>

</style>
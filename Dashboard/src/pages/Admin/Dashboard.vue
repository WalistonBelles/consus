<template>
    <div style="text-align: center;">
        <h1 style="color: #122c77;">Painel Adm!</h1>
        <div class="row">
            <div v-if="users != undefined" class="col-sm-3">
                <div class="card">
                    <div class="card-bg-green">Usuários</div>
                    <div class="card-body">
                        <p class="card-text"> <i class="tim-icons icon-single-02"></i> {{users.length}}</p>
                    </div>
                </div>
            </div>
            <div v-if="doctors != undefined" class="col-sm-3">
                <div class="card">
                    <div class="card-bg-green">Médicos</div>
                    <div class="card-body">
                        <p class="card-text"><i class="tim-icons icon-laptop"></i> {{doctors.length}}</p>
                    </div>
                </div>
            </div>
            <div v-if="schedules != undefined" class="col-sm-3">
                <div class="card">
                    <div class="card-bg-green">Consultas Atendidas</div>
                    <div class="card-body">
                        <p class="card-text"><i class="tim-icons icon-notes"></i> {{schedules.length}}</p>
                    </div>
                </div>
            </div>
            <div v-if="querys != undefined" class="col-sm-3">
                <div class="card">
                    <div class="card-bg-green">Consultas Pendentes</div>
                    <div class="card-body">
                        <p class="card-text"><i class="tim-icons icon-notes"></i> {{querys.length}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Usuários</div>
                    <div class="card-body">
                        <p class="card-text">Cadastrar um novo usuário.</p>
                        <a href="#/admin/register"><base-button type="success"><i class="tim-icons icon-single-02"></i> Usuário</base-button></a>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Pacientes</div>
                    <div class="card-body">
                        <p class="card-text">Cadastrar um novo Paciente.</p>
                        <a href="#/employee/newpatient"><base-button type="success"><i class="tim-icons icon-single-02"></i> Paciente</base-button></a>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Cargo</div>
                    <div class="card-body">
                        <p class="card-text">Cadastrar um novo cargo.</p>
                        <a href="#/admin/role"><base-button type="success"><i class="tim-icons icon-simple-add"></i> Cargo</base-button></a>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Especialidade</div>
                    <div class="card-body">
                        <p class="card-text">Cadastrar nova especialidade.</p>
                        <a href="#/admin/specialty"><base-button type="success"><i class="tim-icons icon-simple-add"></i> Especialidade</base-button></a>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Médico</div>
                    <div class="card-body">
                        <p class="card-text">Adicionar novo médico.</p>
                        <a href="#/admin/doctor"><base-button type="success"><i class="tim-icons icon-simple-add"></i> Médico</base-button></a>
                    </div>
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
import BaseAlert from "../../components/BaseAlert";
import BaseButton from "../../components/BaseButton";
import api from '@/services/api';
export default {
    created(){
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        api.get("/user",req).then(res => {
            this.users = res.data;
            api.get("/doctor",req).then(res => {
                this.doctors = res.data;
                api.get("/consultationhistory",req).then(res => {
                    this.schedules = res.data;
                    api.get("/querys",req).then(res => {
                        this.querys = res.data;
                    }).catch(err => {
                        this.$router.push({name: 'nopermission'});
                    })
                }).catch(err => {
                    this.$router.push({name: 'nopermission'});
                })
            }).catch(err => {
                this.$router.push({name: 'nopermission'});
            })
        }).catch(err => {
            this.$router.push({name: 'nopermission'});
        })
    },
    data()
    {
        return {
            users: [],
            doctors: [],
            schedules: [],
            querys: [],
            showModal: false,
            deleteUserId: -1
        }
    },
    components: {
        BaseAlert,
        BaseButton
    },
    methods: {
        hideModal(){
            this.showModal = false;
        },
        showModalUser(id){
            this.deleteUserId = id;
            this.showModal = true;
        },
        deleteUser(){
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            api.delete("/user/"+this.deleteUserId, req).then(res => {
                console.log(res);
                this.showModal = false;
                this.users = this.users.filter(u => u.id != this.deleteUserId);
            }).catch(err => {
                console.log(err);
                this.showModal = false;
            });
        }
    },
    filters: {
        processRole: function(value){
            if(value == 0){
                return "Usuário comum";
            }else if(value == 1){
                return "Regulador"
            }else if(value == 2){
                return "Unidade Básica"
            }else if(value == 3){
                return "Admin"
            }
        }
    }
}
</script>

<style scoped>

</style>
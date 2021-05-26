<template>
    <div style="text-align: center;">
        <h1>Painel Adm!</h1>
        
        <div class="row">
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-bg-green">Usuários</div>
                    <div class="card-body">
                        <p class="card-text"> <i class="tim-icons icon-single-02"></i> {{users.length}}</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-bg-green">Médicos</div>
                    <div class="card-body">
                        <p class="card-text">{{doctors.length}}</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-bg-green">Consultas</div>
                    <div class="card-body">
                        <p class="card-text">{{schedules.length}}</p>
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
                        <a href="#/register"><base-button type="success"><i class="tim-icons icon-single-02"></i> Usuário</base-button></a>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Cargo</div>
                    <div class="card-body">
                        <p class="card-text">Cadastrar um novo cargo.</p>
                        <a href="#/role"><base-button type="success"><i class="tim-icons icon-simple-add"></i> Cargo</base-button></a>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Especialidade</div>
                    <div class="card-body">
                        <p class="card-text">Cadastrar nova especialidade.</p>
                        <a href="#/specialty"><base-button type="success"><i class="tim-icons icon-simple-add"></i> Especialidade</base-button></a>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Médico</div>
                    <div class="card-body">
                        <p class="card-text">Adicionar novo médico.</p>
                        <a href="#/doctor"><base-button type="success"><i class="tim-icons icon-simple-add"></i> Médico</base-button></a>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-header">Agenda</div>
                    <div class="card-body">
                        <p class="card-text">Cadastrar nova consulta.</p>
                        
                    </div>
                    <div class="card-footer"><a href="#/schedule"><base-button type="success"><i class="tim-icons icon-simple-add"></i> Agenda</base-button></a></div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import BaseAlert from "../components/BaseAlert";
import BaseButton from "../components/BaseButton";
import axios from 'axios';
export default {
    created(){
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get("http://localhost:3000/user",req).then(res => {
            this.users = res.data;
        }).catch(err => {
            console.log(err);
            this.$router.push({name: 'login'});
        })
        axios.get("http://localhost:3000/doctor",req).then(res => {
            this.doctors = res.data;
        }).catch(err => {
            console.log(err);
        })
        axios.get("http://localhost:3000/consultationhistory",req).then(res => {
            this.schedules = res.data;
        }).catch(err => {
            console.log(err);
        })
    },
    data()
    {
        return {
            users: [],
            doctors: [],
            schedules: [],
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
            axios.delete("http://localhost:3000/user/"+this.deleteUserId, req).then(res => {
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
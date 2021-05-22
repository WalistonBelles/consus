<template>
    <div style="text-align: center;">
        <h1>Painel Adm!</h1>
        <card type="user">
            <div class="author">
            <div class="block block-one"></div>
            <div class="block block-two"></div>
            <div class="block block-three"></div>
            <div class="block block-four"></div>
            <a href="#">
                <img class="avatar" src="img/anime6.png" alt="...">
            </a>
            <p class="description">
                Administrador
            </p>
            </div>
            <p></p>
            <p class="card-description">
            </p>
                <div slot="footer" class="button-container">
                <a href="#/register"><base-button simple type="primary"><i class="tim-icons icon-single-02"></i> Cadastrar Usuário</base-button></a>
                <a href="#/role"><base-button simple type="primary"><i class="tim-icons icon-simple-add"></i>  Cadastrar Cargo</base-button></a>
                <a href="#/specialty"><base-button simple type="primary"><i class="tim-icons icon-simple-add"></i>  Cadastrar Nova Especialidade</base-button></a>
                <a href="#/doctor"><base-button simple type="primary"><i class="tim-icons icon-simple-add"></i>  Cadastrar Nova Especialidade para um Médico</base-button></a>
                <a href="#/schedule"><base-button simple type="primary"><i class="tim-icons icon-simple-add"></i>  Agenda</base-button></a>
            </div>
        </card>
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
            console.log("Nao Deu Erro");
            console.log(res);
            this.users = res.data;
        }).catch(err => {
            console.log("Deu Erro");
            console.log(err);
        })
    },
    data()
    {
        return {
            users: [],
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
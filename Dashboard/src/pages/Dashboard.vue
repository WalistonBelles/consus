<template>
    <div style="text-align: center;">
        <h1>Painel Adm!</h1>
        <table class="table" border="1">
          <thead>
              <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Cargo</th>
              <th>Ações</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="user in users" :key="user.id">
                  <td>{{user.name}}</td>
                  <td>{{user.email}}</td>
                  <td>{{ user.role | processRole }}</td>
                  <td>
                      <router-link :to="{name: 'UserEdit', params:{id: user.id}}">
                        <base-button type="success" size="sm" icon>
                          <i class="tim-icons icon-settings"></i>
                        </base-button>
                      </router-link> | 
                      <base-button type="danger" size="sm" icon @click="showModalUser(user.id)">
                        <i class="tim-icons icon-simple-remove"></i>
                      </base-button>
                  </td>
              </tr>
          </tbody>
        </table>
        <div :class="{modal: true, 'is-active': showModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                
                <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                    Você quer realmente deletar este usuário?
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        <p>BLA BLA BLA!</p>
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                    <a href="#" class="card-footer-item" @click="deleteUser()">Sim, quero deletar!</a>
                </footer>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
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
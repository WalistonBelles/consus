<template>
    <div>
        <h2 style="color: #122c77;">Cadastro de Especialidades!</h2>    
        <hr>
        <card>
            <form>
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <div class="form-row">
                    <base-input class="col-md-6" type="text" label="Nome da Especialidade" placeholder="Nome da especialidade" v-model="nome"/>
                </div>
                <base-button class="animation-on-hover" type="success" @click="register">Cadastrar</base-button>
            </form>
        </card>
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
        }).catch(err => {
            this.$router.push({name: 'nopermission'});
        })
    },
    data(){
        return {
            users: [],
            nome: '',
            error: undefined,
        }
    },
    components: {
        BaseAlert,
        BaseButton
    },
    methods: {
        register(){
            api.post("/specialty",{
                nome: this.nome
            }).then(res => {
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
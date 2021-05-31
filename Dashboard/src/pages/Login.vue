<template>
    <div>
        <h2 style="color: #122c77;">Login</h2>    
        <hr>
        <card>
            <form>
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <div class="form-row">
                    <base-input class="col-md-6" type="email" label="Email" placeholder="Email" v-model="email"/>
                </div>
                <div class="form-row">
                    <base-input class="col-md-6" type="password" label="Password" placeholder="***********" v-model="password"/>
                </div>
                <base-button class="animation-on-hover" type="success" @click="login">Acessar</base-button>
            </form>
        </card>
    </div>
</template>

<script>
    import BaseAlert from "../components/BaseAlert";
    import BaseButton from "../components/BaseButton";
    import Modal from '@/components/Modal';
    import api from '@/services/api';
    export default {
        data(){
            return {
                password: '',
                email: '',
                error: undefined,
            }
        },
        components: {
            BaseAlert,
            BaseButton,
            Modal
        },
        methods: {
            login(){
                api.post("/login",{
                    password: this.password,
                    email: this.email
                }).then(res => {
                    localStorage.setItem('token',res.data.token);
                    if(res.data.cargo == 5){
                        this.$router.push({name: 'dashboard'});
                    }else if(res.data.cargo == 4){
                        this.$router.push({name: 'doctor_dashboard'});
                    }else {
                        this.$router.push({name: 'register'});
                    }
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
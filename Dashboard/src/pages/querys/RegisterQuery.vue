<template>
    <div>
        <h2 style="color: #122c77;">Cadastro de Cargos!</h2>    
        <hr>
        <card>
            <form>
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <div class="form-row">
                    <base-input class="col-md-6" type="text" label="Nome" placeholder="Nome do usuário" v-model="nome"/>
                    <base-input class="col-md-6" type="text" label="Codigo" placeholder="Código" v-model="codigo"/>
                </div>
                <base-button class="animation-on-hover" type="success" @click="register">Cadastrar</base-button>
            </form>
        </card>
    </div>    
</template>

<script>
export default {
    data(){
        return {
            nome: '',
            codigo: '',
            error: undefined,
        }
    },
    components: {
        BaseAlert,
        BaseButton
    },
    methods: {
        register(){
            axios.post("http://localhost:3000/role",{
                nome: this.nome,
                codigo: this.codigo
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
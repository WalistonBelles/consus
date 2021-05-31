<template>
    <div>
        <h2 style="color: #122c77;">Consultas para Atender!</h2>    
        <hr>
        <card>
            <form>
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <base-input class="col-md-6" type="text" label="Digite o CRM" placeholder="Digite o CRM" v-model="crm"/>
                <base-button class="animation-on-hover" type="success" @click="consultar">Consultar</base-button>
            </form>
            <div v-if="querys.length > 0">
                <table class="table table-hover" v-if="querys.length > 0">
                    <thead>
                        <tr>
                            <th scope="col">Paciente</th>
                            <th scope="col">Medico</th>
                            <th scope="col">Unidade</th>
                            <th scope="col">Descricao</th>
                            <th scope="col" class="text-center">Status</th>
                            <th scope="col" class="text-center">Operações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="query in querys" :key="query.id">
                            <td>{{query.unome}}</td>
                            <td>{{query.id_usuario}}</td>
                            <td>{{query.nome}}</td>
                            <td>{{query.data}}</td>
                            <td class="text-center"><p class="text-danger">{{query.atendida}}</p></td>
                            <td class="text-center">
                                <router-link :to="{name: 'tomeet', params:{id: query.conid, paciente_id: query.pacid, unidade_id: query.unid, medico_id: query.medid}}">
                                    <base-button simple type="primary">Atender</base-button>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
    </div>    
</template>

<script>
import BaseAlert from "../../components/BaseAlert";
import BaseButton from "../../components/BaseButton";
import BaseTable from "../../components/BaseTable";
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
            querys: [],
            crm: '',
            error: undefined,
        }
    },
    components: {
        BaseAlert,
        BaseButton,
        BaseTable
    },
    methods: {
        consultar(){
            api.post("/answerInquiry",{
                crm: this.crm
            }).then(res => {
                this.querys = res.data;
                this.error = undefined;
            }).catch(err => {
                console.log(err);
                var msgErro = err.response.data.err;
                this.error = msgErro;
                this.querys = [];
            })
        }
    }
}
</script>

<style scoped>

</style>
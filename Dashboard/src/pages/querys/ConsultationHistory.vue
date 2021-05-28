<template>
    <div>
        <h2 style="color: #122c77;">Histórico de Consultas do Paciente!</h2>    
        <hr>
        <card>
            <form>
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <base-input class="col-md-6" type="text" label="Digite o CPF" placeholder="Digite o CPF" v-model="cpf"/>
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
                            <th scope="col">Data</th>
                            <th scope="col" class="text-right">Operações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="query in querys" :key="query.id">
                            <td>{{query.unome}}</td>
                            <td>{{query.id_usuario}}</td>
                            <td>{{query.nome}}</td>
                            <td>{{query.descricao}}</td>
                            <td>{{query.data}}</td>
                            <td class="text-right">
                                <base-button type="success" size="sm" icon>
                                    <i class="tim-icons icon-settings"></i>
                                </base-button>
                                <base-button type="danger" size="sm" icon>
                                    <i class="tim-icons icon-simple-remove"></i>
                                </base-button>
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
    data(){
        return {
            querys: [],
            cpf: '',
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
            api.post("/usercpf",{
                cpf: this.cpf
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
<template>
    <div class="container" style="text-align: center;">
        <div class="row">
            <div class="col align-self-center">
                <div class="col-sm-6" style>
                    <div class="card">
                        <div class="card-header">
                            Agendar Consulta
                            </div>
                        <div class="card-body">
                            Data: {{dia}}/{{mes}}/{{ano}} às {{hora}}:{{minuto}}
                        </div>
                        <div class="card-footer">
                            <a href="#/employee/consultationHistory">
                                <base-button type="success">
                                    <i class="tim-icons icon-simple-add"></i> Agendar
                                </base-button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert";
import BaseButton from "@/components/BaseButton";
import BaseTable from "@/components/BaseTable";
export default {
        created(){
            this.ano = this.$route.params.year;
            this.mes = this.$route.params.month;
            this.dia = this.$route.params.days;
            this.hora = this.$route.params.startTime.substring(1, 3);
            this.minuto = this.$route.params.startTime.substring(4, 6);
        },
        data(){
            return {
                ano: '',
                mes: '',
                dia: '',
                hora: '',
                minuto: '',
                error: undefined,
            }
        },
        components: {
            BaseAlert,
            BaseButton,
            BaseTable
        },
        methods: {
            
        }
    }
</script>

<style scoped>

</style>
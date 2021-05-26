<template>
    <div>
        <h2>Login</h2>    
        <hr>
        <card>
            <div>
                <input type="file" name="file" multiple ref="files" />
                <button @click="sendFile">Alterar Foto</button>
            </div>
        </card>
    </div>    
</template>

<script>
export default {
    methods: {
        async sendFile() {
            let dataForm = new FormData();
            for (let file of this.$refs.files.files) {
                dataForm.append(`file`, file);
            }
            let res = await fetch(`http://localhost:3000/upload`, {
                method: 'POST',
                body: dataForm,
            });
            let data = await res.json();
            console.log(data);
        },
    }
}
</script>

<style scoped>

</style>
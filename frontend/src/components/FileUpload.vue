<template>
    <div>
        <h1>Uplaod File</h1>

        <form @submit.prevent="uploadFile">
            <label for="file">Choose a file to upload:</label>
            <input type="file" id="file" @change="onFileChange" accept="image/*, .pdf, .doc" />

            <button type="submit" :disabled="!selectedFile">Upload</button>
        </form>

        <div v-if="files.length">
            <h2>Available fILES</h2>
            <UL>
                <li v-for="file in files" :key="file.id">
                    <a :href="getFileUrl(file.filename)" target="_blank">{{ file.filename }}</a>
                </li>
            </UL>
        </div>
        <p v-else>No files available yet.</p>
    </div>

</template>

<script>
import axios from 'axios';

export default{
    data(){
        return{
            selectedFile:null,
            uploadResponse:null,
            files:[],
        }
    },
    async created(){
        await this.fetchFiles();
    },
    methods:{
        onFileChange(event){
            this.selectedFile = event.target.files[0]
        },
        async uploadFile(){
            if (!this.selectedFile){
                this.$toast.error('No file selectd',{
                    position:'top-right',
                    duration: 5000,
                })
                return;
            }

            const formData = new FormData();
            formData.append("file",this.selectedFile);

            try{
                const response = await axios.post('/upload',formData,{
                    headers:{
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response.data)
                this.$toast.success('File Uploaded Successfully',{
                    position:'top-right',
                    duration: 5000,
                })
                await this.fetchFiles();
            } catch(error){
                console.error(error)
            }
        },
        async fetchFiles(){
            try{
                const response = await axios.get("/upload");
                this.files = response.data.files || [];
            } catch(error){
                console.log(error)
            }
        },
        getFileUrl(filename){
            const BACKEND_BASE_URL = "http://127.0.0.1:5000"
            return `${BACKEND_BASE_URL}/static/${filename}`
        }
    }
}

</script>
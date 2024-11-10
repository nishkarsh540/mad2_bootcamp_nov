<template>
    <div>
        <form @submit.prevent="signupUser">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required>
            </div>
            <div>
                <label for="role">Role</label>
                <select  id="role" v-model="role">
                    <option value="user">User</option>
                    <option value="store-manager">Store Manager</option>
                </select>
            </div>
            <div v-if="role=='store-manager'" >
                
                <p>hello</p>
            </div>
            <button type="submit">Signup</button>
        </form>
        <div v-if="errorMessage">
            {{ errorMessage 
            }}
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default{
    data(){
        return{
            username:'',
            password:'',
            role:'user',
            errorMessage:''
        };
    },
    methods:{
        async signupUser(){
            try{
                await axios.post('/signup',{
                    username:this.username,
                    password:this.password,
                    role:this.role
                });
                this.$router.push('/login');
            } catch(error){
                this.errorMessage = error.response ? error.response.data.message:'Signup Failed Please try again'
            }
        }
    }
}
</script>

<style scoped>

</style>
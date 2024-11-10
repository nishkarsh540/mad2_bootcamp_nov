<template>
    <div>
        <form @submit.prevent="loginUser">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required>
            </div>
            
            <button type="submit">Login</button>
        </form>
        <div v-if="errorMessage">
            {{ errorMessage }}
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
            errorMessage:''
        };
    },
    methods:{
        async loginUser(){
            try{
                const response = await axios.post('/login',{
                    username:this.username,
                    password:this.password
                });
                const {access_token,user} = response.data;
                console.log(user);
                localStorage.setItem('user',JSON.stringify(user));
                this.$store.dispatch('login',{token:access_token});

                if (user.role==='admin'){
                    this.$router.push('/admin-dashboard')
                } else if (user.role === 'store-manager'){
                    this.$router.push('/store-dashboard')
                } else {
                    this.$router.push('/user-dashboard')
                }
            } catch(error){
                this.errorMessage = error.response ? error.response.data.message:'Signup Failed Please try again'
            }
        }
    }
}
</script>

<style scoped>

</style>
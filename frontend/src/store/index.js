import {createStore} from 'vuex';
import router from '../router';
import {jwtDecode} from 'jwt-decode'
import axios from 'axios';

export default createStore({
    state:{
        token:localStorage.getItem('token') || '',
        user:JSON.parse(localStorage.getItem('user')) || null
    },
    getters:{
        isAuthenticated : state => !!state.token,
        userRole: state=>{
            if(state.token){
                const decoded = jwtDecode(state.token);
                return decoded.sub;
            }
            return null;
        }
    },
    mutations:{
        setToken(state,token){
            state.token = token;
            if (token){
                localStorage.setItem('token',token);
            } else{
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
        logout(state){
            const accessToken = state.token;
            axios.post('/logout',null,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                },
            })
            .then(()=>{
                state.token='',
                state.user=null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            })
            .catch(error =>{
                console.error(error);
            })
        }
    },
    actions:{
        login({commit},{token}){
            console.log('token triggered');
            commit('setToken',token);
        },
        logout({commit}){
            commit('logout');
            router.push('login');
        }
    }
}

)
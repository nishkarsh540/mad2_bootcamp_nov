<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div v-if="isAuthenticated">
      <router-link to="/admin-dashboard">Admin Dashboard</router-link>
      <button @click="logout">Logout</button>
    </div>
  </nav>
  <div id="app">
    <nav-bar />
  </div>
  <router-view/>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapGetters,mapActions } from 'vuex';

export default{
  name:'App',
  components:{
    NavBar,
  },
  computed:{
    ...mapGetters(['isAuthenticated'])
  },
  methods:{
    ...mapActions(['logout'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

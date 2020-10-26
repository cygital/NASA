<template>
  <div class="menu-column">
    <div class="name">Hi, {{ user.name }}</div>
    <div class="menu-item"><router-link to="/dashboard">List of 10 Asteroids</router-link></div>
    <div class="menu-item"><router-link to="/searchbyrange">Asteroids By Date Range</router-link></div>
    <div class="menu-item"><router-link to="/searchbyid">Search Asteroids</router-link></div>
    <div class="menu-item"><router-link to="/saved">Saved Asteroids</router-link></div>
    <div class="menu-item" style="padding-top:30px"><router-link to="/logout">Logout</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      user:this.$store.state.user
    }
  }
}
</script>

<style scoped>
.name{
  font-size: 1.5em;
  padding-bottom: 2em;
}

.menu-item{
  padding:0.5em 0; 
}
.menu-column{
  width: 100%;
  background: rgb(61, 79, 93);
  color: #fff;
  padding: 1.5em 2em;
  text-align: center;
}
.menu-column a{
  color:#eee;
  text-decoration: none;
}
@media (min-width: 48em){
  .menu-column {
    width: 20%;
    display: inline-block;
    text-align: left;
    position: fixed;
    top: 0;
    bottom: 0;
  }

}
</style>

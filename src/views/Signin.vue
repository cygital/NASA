<template>
  <div class="signinform">
    <div>Hey, Let's get you in</div>
    <div>
      <input type="text" name="email" v-model="loginFields.email" placeholder="Email Address" />
    </div>
    <div>
      <input type="password" name="password" v-model="loginFields.password" placeholder="Password" />
    </div>
    <div>
      <button type="button" v-on:click="login()">Sign In</button>
    </div>
    <div>
      Don't have an account?  <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>
<script>
import { db, auth } from '../firebase';
export default {
  name: 'Signin',
  data() {
    return {
      loginFields: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      auth.signInWithEmailAndPassword(this.loginFields.email, this.loginFields.password)
      .then(
        user => {
          this.$store.commit("setAuthentication", true)
            db.collection('users').where('auth_id', '==', user.user.uid).get().then((docs) => {
            docs.forEach(doc => {
              this.$store.commit("setUser", {id:user.user.uid, name:doc.data().name})
            })
            this.$router.replace({ name: "Dashboard" })
          }).catch((error) => {
            console.log(error)
          })
        },
        err => {
          alert("Oops. " + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
input, button {
  width:100%;
  display:block;
}
.signinform{
  width:25em;
  margin: 3em auto;
  text-align:center;
  background: #fafafa;
  padding: 1em;
}
.signinform div{
 margin: 1em 0;
}
a {
  color: #42b983;
}
</style>

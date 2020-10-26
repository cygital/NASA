<template>
  <div class="signupform">
    <div>Welcome, create an account</div>
      <div>
        <input type="text" name="name" v-model="registrationFields.name" placeholder="Your name" />
      </div>
      <div>
        <input type="text" name="email" v-model="registrationFields.email" placeholder="Email Address" />
      </div>
      <div>
        <input type="password" name="password" v-model="registrationFields.password" placeholder="Password" />
      </div>
      <div>
        <button type="button" v-on:click="register()" >Sign Up</button>
      </div>
      <div>
        If you already have an account,  <router-link to="/">Sign In</router-link>
      </div>
  </div>
</template>

<script>
import { db, auth } from '../firebase';
export default {
  name: 'Signup',
  data() {
    return {
      registrationFields: {
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    register() {
      auth.createUserWithEmailAndPassword(this.registrationFields.email, this.registrationFields.password)
      .then(
        user => {
          console.log(user.user.uid)
          db.collection('users').add({
              auth_id:user.user.uid,
              name:this.registrationFields.name,
              email:this.registrationFields.email,
            })
            .then(() => {
            alert("User successfully created!");
            this.registrationFields.name = ''
            this.registrationFields.email = ''
            this.registrationFields.password = ''
          }).catch((error) => {
              console.log(error);
          })
        },
        err => {
          alert(err.message);
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
  .signupform{
    width:25em;
    margin: 3em auto;
    text-align:center;
    background: #fafafa;
    padding: 1em;
  }
  .signupform div{
  margin: 1em 0;
  }
  a {
    color: #42b983;
  }
</style>
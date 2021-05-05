<template>
  <q-page class="flex flex-center q-mt-sm">
    <div>
      <q-input
        v-model="email"
        filled
        type="email"
        placeholder="Email"
        class="input q-mt-none"
      />
      <q-input
        placeholder="Password "
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        class="input q-mt-md"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn
        @click="login"
        color="primary"
        icon-right="send"
        label="Login"
        class="q-mt-md"
      />
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase";
import db from "../boot/firebase";

export default {
  name: "Login",
  data() {
    return {
      password: "",
      isPwd: true,
      email: "",
    };
  },
  methods: {
    login: function (e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            alert(`You are logged in as ${user.user.email}`);
            // console.log(user);
            this.$router.push("/addtodo");
          },
          (err) => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },
  },
};
</script>
<style scoped>
.input {
  width: 500px !important;
}
</style>

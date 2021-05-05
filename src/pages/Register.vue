<template>
  <q-page class="flex flex-center q-mt-sm">
    <div>
      <q-input
        v-model="username"
        filled
        type="text"
        placeholder="Username"
        class="input q-mt-none"
      />
      <q-input
        v-model="email"
        filled
        type="email"
        placeholder="Email"
        class="input q-mt-md"
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
        @click="register"
        color="primary"
        icon-right="send"
        label="Register"
        class="q-mt-md"
        align="right"
      />
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase";
import db from "../boot/firebase";

export default {
  name: "Register",
  data() {
    return {
      password: "",
      isPwd: true,
      email: "",
      username: "",
    };
  },
  methods: {
    register: function (e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            alert(`Account created for ${user.user.email}`);
            user.user.updateProfile({
              displayName: this.username,
            });
            db.collection("users")
              .doc(user.user.uid)
              .set({
                todos: [],
                username: this.username,
                email: this.email,
              })
              .then(() => {
                this.$router.push("/addtodo");
              });
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

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title> Task (Add Todo) </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="flex flex-center q-mt-sm">
        <div>
          <q-input
            autogrow
            bottom-slots
            filled
            v-model="newTodo"
            placeholder="Add a New Todo"
            counter
            maxlength="300"
            class="newTodo q-mb-md"
          >
          </q-input>
          <div class="flex flex-center q-mt-sm">
            <label color="primary">End Date : {{ date }}</label>
          </div>
          <div class="flex flex-center q-mt-sm">
            <q-date v-model="date"></q-date>
          </div>
          <div class="flex flex-center q-mt-sm">
            <q-btn
              @click="addTodo()"
              color="primary"
              icon-right="send"
              label="Add"
              class="q-mt-md"
              align="right"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import db from "../boot/firebase";
import firebase from "firebase";

export default {
  name: "Addtodo",
  data() {
    return {
      newTodo: "",
      date: "",
      user: Object,
    };
  },
  mounted() {
    let user = firebase.auth().currentUser;
  },
  methods: {
    addTodo() {
      let date = new Date(this.date);
      let milliseconds = date.getTime();
      let user = firebase.auth().currentUser;
      console.log(user.email);
      let newTd = {
        content: this.newTodo,
        date: milliseconds,
        email: user.email,
        username: user.displayName,
      };
      db.collection("todos")
        .add(newTd)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      this.newTodo = "";
      this.date = "";
    },
  },
};
</script>
<style scoped>
.newTodo {
  width: 500px;
}
.newTodo textarea {
  line-height: 1.4;
  font-size: 19px;
}
</style>
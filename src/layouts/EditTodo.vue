<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title> Task (Edit Todo) </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center q-mt-sm">
        <div>
          <q-input
            autogrow
            bottom-slots
            filled
            v-model="content"
            counter
            maxlength="300"
            class="editTodo q-mb-md"
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
              @click="editTodo()"
              color="primary"
              icon-right="send"
              label="Edit"
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
import { format, compareAsc } from "date-fns";
import db from "../boot/firebase";
export default {
  data() {
    return {
      todo: Object,
      content: "",
      date: Number,
    };
  },
  mounted() {
    let id = this.$route.params.id;
    db.collection("todos")
      .doc(id)
      .onSnapshot((doc) => {
        // console.log("Current data: ", doc.data());
        this.todo = doc.data();
        this.todo.id = doc.id;
        this.date = format(new Date(this.todo.date), "yyyy/MM/dd");
        this.content = this.todo.content;
      });
  },
  methods: {
    editTodo() {
      let id = this.$route.params.id;
      this.todo.content = this.content;
      let date = new Date(this.date);
      let milliseconds = date.getTime();
      this.todo.date = milliseconds;
      let editTodo = this.todo
      db.collection("todos")
        .doc(id)
        .set({
          content: this.content,
          date: milliseconds,
          username: this.todo.username,
          email: this.todo.email
        })
        .then(() => {
          this.$router.push("/admin");
          alert("Document editted")
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          alert("Document couldnot be editted")
          this.$router.push("/admin");
        });
    },
  },
};
</script>

<style scoped>
.editTodo {
  width: 500px;
}
.editTodo textarea {
  line-height: 1.4;
  font-size: 19px;
}
</style>
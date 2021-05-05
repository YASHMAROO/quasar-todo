<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title> Task (Admin View) </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="flex flex-center q-mt-md q-pt-md">
      <q-list separator class="list">
        <q-item class="q-py-md grey" v-for="todo in todos" :key="todo.id">
          <q-item-section>
            <q-item-label>
              <strong> {{ todo.username }} </strong>
              <span class="text-grey-7 q-ml-xs">
                {{ todo.email }}
                &bull; {{ todo.date | relativeDate }}
              </span>
            </q-item-label>
            <q-item-label class="todo-content">
              {{ todo.content }}
            </q-item-label>
            <div class="todo-icons row q-mt-sm">
              <q-btn
                @click="editTodo(todo)"
                flat
                size="sm"
                round
                color="grey"
                icon="edit"
              />
              <q-btn
                @click="deleteTodo(todo)"
                flat
                size="sm"
                round
                color="grey"
                icon="fas fa-trash"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
import db from "../boot/firebase";
import { formatDistance } from "date-fns";

export default {
  data() {
    return {
      todos: [
        // {
        //   id: 1,
        //   name: "Yash maroo",
        //   email: "maroo@maroo.com",
        //   content:
        //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ",
        //   date: 1620134960068,
        //   liked: false,
        // },
        // {
        //   id: 2,
        //   name: "Yash maroo",
        //   email: "maroo@maroo.com",
        //   content: "Lorem Ipsum",
        //   date: 1620134960068,
        //   liked: false,
        // },
        // {
        //   id: 3,
        //   name: "Yash maroo",
        //   email: "maroo@maroo.com",
        //   content:
        //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ",
        //   date: 1620134960068,
        //   liked: false,
        // },
        // {
        //   id: 4,
        //   name: "Yash maroo",
        //   email: "maroo@maroo.com",
        //   content:
        //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ",
        //   date: 1620134960068,
        //   liked: true,
        // },
      ],
      medium: false,
    };
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date(), { addSuffix: true });
    },
  },
  methods: {
    deleteTodo(td) {
      db.collection("todos")
        .doc(td.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    editTodo(todo) {
      let route = "/edit/" + todo.id;
      console.log(route);
      this.$router.push(route)
    },
  },
  mounted () {
    db.collection("todos")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let todoChange = change.doc.data();
          todoChange.id = change.doc.id;
          if (change.type === "added") {
            console.log("New todo: ", todoChange);
            this.todos.unshift(todoChange);
          }
          if (change.type === "modified") {
            console.log("Modified todo: ", todoChange);
            let index = this.todos.findIndex(
              (todo) => todo.id === todoChange.id
            );
            Object.assign(this.todos[index], todoChange);
          }
          if (change.type === "removed") {
            console.log("Removed todo: ", todoChange);
            let index = this.todos.findIndex(
              (todo) => todo.id === todoChange.id
            );
            this.todos.splice(index, 1);
          }
        });
      });
  }
};
</script>

<style scoped>
.list {
  width: 500px !important;
}
</style>
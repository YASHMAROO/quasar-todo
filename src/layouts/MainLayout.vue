 Layout Builder
Visible Header
Visible Footer
Visible left-side Drawer
Visible right-side Drawer
Inject Drawer content for scrolling

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Task
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/" label="Login" />
        <q-route-tab to="/register" label="Register" />
        <q-route-tab to="/admin" label="Admin View" />
        <q-route-tab to="/addtodo" label="Add Todo" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
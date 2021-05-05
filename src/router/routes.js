
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Login.vue') },
      { path: '/register', component: () => import('src/pages/Register.vue') }
    ]
  },
  {
    path: '/addtodo',
    component: () => import('layouts/AddTodo.vue')
  },
  {
    path: '/admin',
    component: () => import('layouts/Admin.vue')
  },
  {
    path: '/edit/:id',
    component: () => import('layouts/EditTodo.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

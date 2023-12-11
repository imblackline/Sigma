import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Assignment1 from '../views/Assignment1.view.vue'
import Assignment2 from '../views/Assignment2.view.vue'
import Assignment3 from '../views/Assignment3.view.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/assignment1',
    name: 'assignment1',
    component: Assignment1
  },
  {
    path: '/assignment2',
    name: 'assignment2',
    component: Assignment2
  },
  {
    path: '/assignment3',
    name: 'assignment3',
    component: Assignment3
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

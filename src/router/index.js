import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Assignment1 from '../views/Assignment1.view.vue'
import Assignment2 from '../views/Assignment2.view.vue'
import Assignment3 from '../views/Assignment3.view.vue'
import Assignment4 from '../views/Assignment4.view.vue'
import Final from '../views/Final.view.vue'
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
  {
    path: '/assignment4',
    name: 'assignment4',
    component: Assignment4
  },
  {
    path: '/final',
    name: 'final',
    component: Final
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

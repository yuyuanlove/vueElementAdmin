import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect:'/login'
	},
	{
		path: '/login',
		component: () => import('../components/login.vue')
	},
	{
		path: '/aa',
		component: () => import('../views/roles.vue')
	},
	{
			path: '/home',
			name: 'Home',
			component: () => import('../views/Home.vue'),
			redirect:'/welcome',
			children:[
				{
					path: '/welcome',
					name: 'welcome',
					component: () => import('../views/welcome.vue')
				},
				{
					path: '/users',
					name: 'users',
					component: () => import('../views/userList.vue')
				},
			]
		},

]

const router = new VueRouter({
	routes
})
router.beforeEach((to,from,next)=>{
	if(to.path=='/login') return next()
	const token = sessionStorage.getItem('token')
	if(!token) return next('./login')
	next()
})

export default router

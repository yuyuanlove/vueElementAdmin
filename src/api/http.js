import axios from 'axios'

axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

axios.interceptors.request.use(config => {
	const token = sessionStorage.getItem('token')
	config.headers.authorization = token
	return config
}, error=> {
	return Promise.reject(error)
})

axios.interceptors.response.use(response=>{
	return response.data
},error=>{
	return Promise.reject(error)
})

export default axios
import axios from './http.js'

//登录接口
function login(data){
	return axios.post('login', data)
}
//获取权限菜单列表
function getMenuList(){
	return axios.get('menus')
}
//获取用户列表
function getUserList(data){
	return axios.get('users',{params:data})
}
//添加用户
function addUser(data){
	return axios.post('users',data)
}
//删除用户
function deleteUser(data){
	return axios.delete('users/'+data)
}
export default {
	login,
	getMenuList,
	getUserList,
	addUser,
	deleteUser
}
//api接口管理,方便维护
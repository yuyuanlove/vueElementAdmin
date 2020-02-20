<template>
	<div>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>用户管理</a></el-breadcrumb-item>
			  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
			</el-breadcrumb>
			
			<el-card>
				<div class="top">
						<search :query="getParams.query" @someChange="getSearchData"></search>
						<el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
				</div>
				    <el-table :data="tableData.users" style="width: 100%" border>
							<el-table-column label="#" width="80" type="index"> </el-table-column>
				      <el-table-column prop="username" label="姓名" > </el-table-column>
				      <el-table-column prop="email" label="邮箱"> </el-table-column>
				      <el-table-column prop="mobile" label="电话"> </el-table-column>
							<el-table-column prop="role_name" label="角色"> </el-table-column>
							<el-table-column prop="mg_state" label="状态"> 
								<template slot-scope="scope">
									<el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
								</template>
							</el-table-column>
							<el-table-column prop="address" label="操作"> 
								<template slot-scope="scope">
									  <el-button type="primary" icon="el-icon-edit" circle></el-button>
										<el-button type="danger" icon="el-icon-delete" @click="deleteUser(scope.row.id)" circle></el-button>
									 <el-tooltip  effect="dark" content="角色分配" placement="top" :enterable="false">
											<el-button type="warning" icon="el-icon-star-off" circle></el-button>
										</el-tooltip>
								</template>
							</el-table-column>
				    </el-table>
						<pagination :paginationData="getParams" @someChange="getData"></pagination>
			</el-card>
			
			<el-dialog
			  title="提示"
			  :visible.sync="dialogVisible"
			  width="50%">
			  
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="用户名" prop="username">
				    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="password">
				    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="邮箱" prop="email">
				    <el-input type="text" v-model="ruleForm.email"></el-input>
				  </el-form-item>
					<el-form-item label="手机号" prop="mobile">
					  <el-input v-model.number="ruleForm.mobile"></el-input>
					</el-form-item>
				</el-form>
				
			  <span slot="footer" class="dialog-footer">
			   <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			   <el-button @click="resetForm('ruleForm')">重置</el-button>
			  </span>
			</el-dialog>
			
	</div>
</template>

<script>
	import pagination from '@/components/pagination.vue'
	import search from '@/components/search.vue'
	export default {
		data() {
			var ckeckEmail=(rule,value,cb)=>{
				const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if(regEmail.test(value)){
					return cb()
				}
				cb(new Error('请输入合法的邮箱'))
			}
			return {
				 tableData:{},
				 getParams:{
					 query:'',
					 pagenum:1,
					 pagesize:5,
					 total:0,
				 },
				 dialogVisible:false,
				 ruleForm: {
					username:'',
					password:'',
					email:'',
					mobile:'',
				 },
				 rules: {
					 username: [
						 { required: true, message: '请输入用户名', trigger: 'blur' },
					 ],
					 password: [
						 { required: true, message: '请填写密码', trigger: 'blur' },
						{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
					 ],
					 email: [
						  {required: true,validator: ckeckEmail, trigger: 'blur' }
					 ],
					 mobile: [
						 {required: true,message: '请填写手机号', trigger: 'blur' }
					 ],
				 }
			}
		},
		components:{
			pagination,
			search,
		},
		created() {
			this.getData(this.getParams)
		},
		methods: {
			getSearchData(val){
				this.getParams.query = val
				this.getData(this.getParams)
			},
			 getData(data) {
				this.$api.getUserList(data).then(res=>{
					if(res.meta.status!=200) return false
					this.tableData = res.data
					this.getParams.total = res.data.total
					this.getParams.pagenum = res.data.pagenum
				})
			},
			addUser(){
				this.$api.addUser(this.ruleForm).then(res=>{
					if(res.meta.status!=201) return this.$message.error('添加失败');
					this.dialogVisible = false;
					this.$message.success('添加成功')
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.addUser()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			deleteUser(id){
				this.$confirm('此操作将永久删除该用户，是否继续？','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(res=>{
					if(res == 'confirm'){
						this.$api.deleteUser(id).then(res=>{
							console.log(res);
							if(res.meta.status!=200) return this.$message.error(res.meta.msg);
							this.$message.success(res.meta.msg);
							this.getData(this.getParams)
						})
					}
				})
			}
		},
	}
</script>

<style scoped>
.el-card{
	margin-top: 15px;
}
.top{
	margin-bottom: 20px;
	display: flex;
	flex-flow: row nowrap;
}

</style>
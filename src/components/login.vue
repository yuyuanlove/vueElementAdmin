<template>
	<div class="loginbox">
		<el-card class="login_box">
			<img src="../assets/logo.png" alt="">
			<el-form :model="ruleForm" :rules="rules" ref="myform">
				<el-form-item label="用户名" prop="username">
					<el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" disabled v-if="disabled">登录</el-button>
					<el-button type="primary" v-else @click="login">登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				disabled: true,
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					pass: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 8,
							message: '长度在 6 到 8 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		watch: {
			ruleForm: {
				handler(val, oldVal) {
					const ruleForm = this.ruleForm
					let valid = (ruleForm.username != "") && (ruleForm.password != "") && (ruleForm.password.length > 5 && ruleForm.password
						.length <
						9)
					if (valid) {
						this.disabled = false
					} else {
						this.disabled = true
					}
				},
				deep: true
			}
		},
		methods: {
			async login() {
				this.$api.login(this.ruleForm).then(res=>{
					if (res.meta.status == 200) {
						this.$message({
							message: this.ruleForm.username + '恭喜你，登录成功',
							type: 'success'
						});
						sessionStorage.setItem('token', res.data.token)
						this.$router.push('./home')
					} else {
						this.$message.error('登录失败');
					}
				})
			}
		},
	}
</script>

<style scoped lang="less">
	.loginbox {
		width: 100vw;
		height: 100vh;
		background: #010a3e;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login_box {
		width: 500px;

		img {
			width: 50px;
			height: 50px;
		}
	}
</style>

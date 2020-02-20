<template>
	<div class="header">
		<el-dropdown @command="handleCommand">
		  <span class="el-dropdown-link">
				欢迎，admin<i class="el-icon-arrow-down el-icon--right"></i>
		  </span>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item command="a">黄金糕</el-dropdown-item>
		    <el-dropdown-item command="b">狮子头</el-dropdown-item>
		    <el-dropdown-item command ="c">螺蛳粉</el-dropdown-item>
		    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	export default {
		methods: {
			handleCommand(command) {
				sessionStorage.clear()
				this.$router.push('./login')
			}
		},
	}
</script>


<style scoped lang="less">
	.header{
		width: 100%;
		height: 60px;
		background: indianred;
		display: flex;
		flex-flow: row nowrap;
		justify-content:flex-end;
		align-items: center;
	}
	.el-dropdown{
		margin-right: 10px;
		color: #fff;
	}
</style>

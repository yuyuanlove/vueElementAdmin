<template>
		<el-container class="mean">

			<el-aside width="200px">
				<sliderMean :menuList="menuList"></sliderMean>
			</el-aside>
			
			<el-container class="rightcontainer">
			<el-header>
				<Header></Header>
			</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>

</template>

<script>
	import Header from '../components/header.vue'
	import sliderMean from '../views/sliderMean.vue'
	export default {
		name:'Home',
		components:{
			Header,
			sliderMean
		},
		data() {
			return {
					menuList:[]
			}
		},
		created() {
			this.getMenuList()
		},
		methods: {
			async getMenuList() {
				this.$api.getMenuList().then(res=>{
					if(res.meta.status!=200) return false
					this.menuList = res.data
				})
			}
		},
	}
</script>

<style scoped lang="less">
	.mean{
		height: 100vh;
	}
</style>

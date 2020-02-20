<template>
	<div class="sliderMean" style="height: 100vh;background: rgb(51, 55, 68);">
		<el-menu  background-color="#333744"
		 text-color="#fff" active-text-color="#409eff" unique-opened router :default-active="activePath">
		 
			<el-submenu  v-for="(item,index) in menuList" :index="item.id+''" :key="item.id">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>{{item.authName}}</span>
				</template>
				
					<el-menu-item-group v-if="item.children">
							<el-menu-item v-for="(iten,index1) in item.children" :index="'/'+iten.path" @click="savePath('/'+iten.path)"><i class="el-icon-menu"></i>{{iten.authName}}</el-menu-item>
						</el-menu-item-group>
			</el-submenu>

			
		</el-menu>
	</div>
</template>

<script>
	export default {
		name: 'sliderMean',
		props:['menuList'],
		data() {
			return {
				activePath:''
			}
		},
		created() {
			this.activePath = sessionStorage.getItem('menuPath')
		},
		methods: {
			savePath(path){
				sessionStorage.setItem('menuPath',path)
				this.activePath = path
			}
		}
	}
</script>

<style scoped>
	.el-menu{
		border: none;
	}
</style>

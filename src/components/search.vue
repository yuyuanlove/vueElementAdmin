<template>
	<div class="searchbox">
		<el-input placeholder="请输入用户姓名" v-model="query" class="input-with-select" clearable>
		  <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
		</el-input>
	</div>
</template>

<script>
	export default {
		name:'search',
		props:['query'],
		methods: {
			getData() {
				this.$emit('someChange',this.query)
			}
		},
	}
</script>

<style scoped>
.searchbox{
 	width: 30%;
 	margin-right: 30px;
 }
</style>
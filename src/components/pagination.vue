<template>
	<div>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="totalData.pagenum"
			:page-sizes="[1,5,10,15,20]"
			:page-size="totalData.pagesize"
			layout="total,sizes, prev, pager, next, jumper"
			:total="totalData.total">
		</el-pagination>
	</div>
</template>
<script>
	export default {
		props:['paginationData'],
		data() {
			return {
				totalData:''
			}
		},
		created() {
			this.totalData = this.paginationData
		},
		methods: {
			handleSizeChange(val) {
				//每页条数改变
				this.totalData.pagesize = val
				this.$emit('someChange',this.totalData)
			},
			handleCurrentChange(val){
				//页数改变
				this.totalData.pagenum = val
				this.$emit('someChange',this.totalData)
			},
			
		},
	}
</script>

<style scoped>
	.el-pagination{
		margin-top: 20px;
	}
</style>
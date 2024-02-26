<template>
	<uni-checkbox @click="onSelected">
		<div class="uni-checkbox-wrapper">
			<div :class="[checked ? 'uni-checkbox-input-checked' : '','uni-checkbox-input']" 
			style="color: rgb(0, 122, 255);"></div>
		</div>
	</uni-checkbox>
</template>

<script>


	export default {
		name: 'JOCheckbox',
		model:{
			prop:'checked',
			event:'update:checked'
		},
		props: {
			checked: [Boolean],
		},
		data() {
			return {}
		},
		watch: { 
		},
		methods: {
			onSelected() {
				this.$emit('update:checked',!this.checked)
			}
		}
	}
</script>
<style lang="scss" scoped>
	 
</style>

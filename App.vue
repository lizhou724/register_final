<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function (res) {
					console.log("设备宽度："+res.windowWidth);
					console.log("设备高度："+res.windowHeight);
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/components/uview-ui/index.scss";

</style>

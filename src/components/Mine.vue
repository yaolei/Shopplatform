<template>
	<div class="user_i" style='height: 600px;'>
	<MineHeaderView></MineHeaderView>
	<MineMainView></MineMainView>
	</div>
</template>
<script>
	import MineHeaderView from './MineHeader.vue';
	import MineMainView from './MineMain.vue';
	export default{
		components:{
			MineMainView,
			MineHeaderView
		}
	}
</script>
<style>
@import '../assets/css/mine.css';
</style>
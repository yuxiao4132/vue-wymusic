<template>
	<div class="hometab">
		<div class="left"><slot name="left"></slot></div>
		<div class="center"><slot name="center"></slot></div>
		<div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
  export default {
    name: 'TobTab',
  }
</script>

<style scoped lang="less">

</style>
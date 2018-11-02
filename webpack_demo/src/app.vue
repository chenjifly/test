<template>
	<div id="app">
		<img src="./images/logo.png" alt="logo">
		<span>{{msg}}</span>
		<p class="text">test text</p>
	</div>
</template>

<script>
	import Vue from "vue"
	export default{
		name:"app",
		data(){
			return{
				mag:'hello vue!'
			}
		},
	}
</script>
<style>
    .test{
        color:#020202
    }
</style>

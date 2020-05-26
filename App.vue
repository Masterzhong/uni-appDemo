<script>
	import {
		pushMessage
	} from './common/pushMessage.js'
	import {
		checkNetWork
	} from './common/checkNetwork.js'
	import {
		checkUpdate
	} from './common/checkUpdate.js'
	import {
		Badge
	} from './common/badge.js'
	export default {

		onLaunch: function() {
			//#ifdef APP-PLUS 
			new pushMessage();
			new checkUpdate();
			var badge = new Badge();
			//#endif
		},
		onShow: function() {
			//#ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			new checkNetWork()
			//#endif
		},
		onHide: function() {
			console.log('App Hide')
		},
		onLoad: function() {
			console.log('App onLoad')
		},
		methods: {}
	}
</script>

<style>
	@import "./static/icon/iconfont.css";

	/*每个页面公共css */
	page {
		background-color: #f7f7f7;
	}

	.icon {
		width: 60 upx;
		height: 60 upx;
		vertical-align: -20 upx;
		fill: currentColor;
		overflow: hidden;
	}

	.vi-color {
		color: #fb5373 !important;
	}
</style>

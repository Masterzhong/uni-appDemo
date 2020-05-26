import helper from './helper.js'
class Http {
	request({
		url,
		data = {},
		method = 'GET',
		header = {}
	}) {
		return new Promise((resolve, reject) => {
			this._request(url, resolve, reject, data, method, header)
		})
	}


	_request(url, resolve, reject, data, method, header) {
		var token, token_type
		uni.getStorage({
			key: 'access_token',
			success: res => {
				token = res.data
			}
		})
		var header
		//判断是否有token
		if (token) {
			header = {
				'content-type': 'application/x-www-form-urlencoded',
				'Authorization': `${token}`
			}
		} else {
			header = {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}
		uni.showLoading({
			title: '加载中',
			icon: 'loading',
			duration: 10000,
			mask: true
		})
		uni.request({
			url: helper.BASE_API + url,
			method: method,
			data: data,
			header: header,
			timeout: 5000,
			success: res => {
				var code = res.statusCode //状态码
				if (res.header.Authorization) {
					var token = res.header.Authorization.split(" ")[1]
					uni.setStorage('access_token', token)
				}
				uni.hideLoading()
				switch (code) {
					case 304:
						resolve(res.data)
						break;
					case 204:
						resolve(res.data)
						break;
					case 202:
						resolve(res.data)
						break;
					case 201:
						resolve(res.data)
						break;
					case 200:
						resolve(res.data)
						break;
					case 404:
						var msg = '没有找到'
						this._show_error(msg)
						reject(msg);
						break;
					case 401:
						uni.clearStorage();
						uni.showModal({
							title: '提示',
							content: '内部使用的收银系统,无权限请联系店长或负责人',
							confirmText: '去登陆',
							confirmColor: '#fb5373',
							showCancel: false,
							success: result => {
								if (result.confirm) {
									uni.navigateTo({
										url: '/pages/login/login'
									})
								}
							}
						})
						break;
					case 402:
						var msg = res.data.message
						this._show_nopermission(msg)
						reject(msg);
						break;
					case 403:
						var msg = res.data.message
						this._show_nopermission(msg, true)
						reject(msg);
						break;
					case 422:
						var msg = res.data.message
						this._show_error(msg)
						reject(msg);
						break;
					case 429:
						var msg = '操作过快，请稍后再试'
						this._show_error(msg)
						reject(msg);
						break;
					case 500:
						var msg = '服务器错误'
						this._show_error(msg)
						reject(msg);
						break;
				}
			},
			fail: err => {
				if (err.errMsg == 'request:fail timeout') {
					err.errMsg = '网络请求超时, 请下拉刷新..';
				}
				uni.hideLoading()
				//this._show_error(err.errMsg)
				/* uni.navigateTo({
					url: `/pages/error/error?msg=${err.errMsg}`
				}) */
				reject(err.errMsg);
			}
		})


	}

	_show_error(msg) {
		uni.vibrateShort()
		uni.showToast({
			title: msg,
			icon: 'none',
			mask: false,
			duration: 3000
		})
	}

	_show_nopermission(msg, type = true) {
		uni.vibrateLong()
		uni.showModal({
			title: '提示',
			content: msg,
			showCancel: false,
			confirmColor: '#fb5373',
			success: (res) => {
				if (res.confirm && type) {
					uni.navigateBack({
						delta: 1
					})
				}
			}
		})

	}

}

export {
	Http
}

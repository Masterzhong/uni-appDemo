import {
	Http
} from '../common/request.js'
class Login extends Http {
	//微信登陆
	wxLogin() {
		return new Promise((reslove, reject) => {
			uni.login({
				provider: 'weixin',
				success: (res) => {
					reslove(res)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
	//app 微信登录
	thridLogin(data) {
		return this.request({
			url: `auth/app`,
			method: 'post',
			data: data
		})
	}

	//手机获取验证码接口
	sendphoneCode(data) {
			return this.request({
				url: 'verificationcodes',
				method: 'post',
				data
			})
		}

		/**手机号登录**/
		phoneLogin(data) {
			return this.request({
				url: `auth/phone`,
				method: 'post',
				data
			})
		}
}

export {
	Login
}

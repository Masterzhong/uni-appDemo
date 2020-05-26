import {Http} from '../common/request.js'

class Sales extends Http{
	    /**导购员菜单**/
	    salesinfo() {
	        return this.request({
	            url: `sales/index`,
	            method: 'get'
	        })
	    }
		
		/**导购门店列表**/
		storeList(){
			return this.request({
				url:`sales/store_ids`,
				method:'get'
			})
		}
}

export {Sales}
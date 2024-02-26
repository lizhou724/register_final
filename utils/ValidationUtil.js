import StringUtil from './StringUtil.js';
import ObjectUtil from './ObjectUtil.js';

const carNoReg = /^(([\u4e00-\u9fa5][a-zA-Z]|[\u4e00-\u9fa5]{2}\d{2}|[\u4e00-\u9fa5]{2}[a-zA-Z])[-]?|([wW][Jj][\u4e00-\u9fa5]{1}[-]?)|([a-zA-Z]{2}))([A-Za-z0-9]{5}|[DdFf][A-HJ-NP-Za-hj-np-z0-9][0-9]{4}|[0-9]{5}[DdFf])$/;

export default class ValidationUtil {
	
	
	/**是否为身份证
	 * @param {Object} value
	 */
	static idCard(value)
	{
		let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
		if (StringUtil.length(value) == 18 && reg.test(value))
		{
			return true
		}
		return false
	}
	
	static carNo(value)
	{ 
		return StringUtil.length(value) > 0 && carNoReg.test(value);
	}
	
	static tel(value)
	{
		return StringUtil.length(value) == 11
	}
}
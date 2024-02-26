
 
export default class ObjectUtil {
	
	/**
	 * 长度
	 * @param {Object} source ...
	 */
	static in(source) //= Java (source, ...)
	{
		if (source != null)
		{
			for(let i=1; i < arguments.length ; i++)
			{
				if (source == arguments[i])
				{
					return true;
				}
			}
		}
		return false;
	}
	
}
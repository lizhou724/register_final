export const MQTT_IP = '10.23.250.241:61614/mqtt'//mqtt地址端口
const MQTT_USERNAME = 'admin'//mqtt用户名
const MQTT_PASSWORD = 'password'//密码
 
export const MQTT_OPTIONS = {
	connectTimeout: 5000,
	clientId:'H5' + new Date().getTime(), //唯一ID 
	username:MQTT_USERNAME, //账号 非必填 看你们设置没有
	password:MQTT_PASSWORD, //密码 非必填
	clean: true,
}
import axios from "axios";
import { message } from "ant-design-vue";
// 创建axios实例
const http = axios.create({
	// 允许携带cookie
	withCredentials: true,
});

// 默认请求地址前缀
// http.defaults.baseURL = '/api-gateway'

// 请求拦截器
http.interceptors.request.use(
	(config) => {
		if (config.methods === "get") {
			config.params = config.data;
			delete config.data;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
http.interceptors.response.use(
	// 请求成功
	(res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),

	// 请求失败
	(error) => {
		const { response } = error;

		if (response) {
			errorHandler(response);
			return Promise.reject(response);
		} else {
			// 处理断网的状态
			if (!window.navigator.onLine) {
			} else {
				return Promise.reject(error);
			}
		}
	}
);

// 错误处理
const errorHandler = (response) => {
	const { data, status } = response;
	switch (status) {
		case 401:
			message.error("未授权，请重新登录");
			break;
		case 403:
			message.error("拒绝访问");
			break;
		case 404:
			message.error("资源未找到");
			break;
		default:
			message.error(data.message);
	}
};

export default http;

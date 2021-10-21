import axios from "@/hooks/axios";

// 发起post请求获取列表
export function postAction (url, params) {
  return axios({
    url,
    method: "post",
    data: params,
  });
}
// 发起get请求进入详情页
export function getAction (url, params) {
  return axios({
    url,
    method: "get",
    params,
  });
}

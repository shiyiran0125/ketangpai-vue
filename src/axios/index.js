import axios from 'axios'
var instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {'Content-type':'application/json;charset=UTF-8'},
  timeout: 3000,
});
var instance2 = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {'Content-type':'multipart/form-data;charset=UTF-8'},
  timeout: 3000,
});

var instance3 = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {'Content-type':'application/x-download;charset=utf-8'},
  timeout: 3000,
});
export function request(url,params) {
      return instance.get(url, {
      params: params
    })
}
export function post(url,params) {
  console.log(params);
  return instance2.post(url,params)
}

export function downLoad(url) {
  return instance3.get(url,{responseType: 'blob'})
}

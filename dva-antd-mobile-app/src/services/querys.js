import { request, config } from 'utils'
const {api : {querypt, querysearchattApi, querysearchlistApi , mylistApi,userOptApi,querypdfApi}} = config;

export async function query() {
  return request({
    url: querypt,
    method: 'get'
  })
}
export async function querysearchatt(data) {
  return request({
    url: querysearchattApi,
    method: 'get',
    data,
  })
}
export async function querysearchlist(data) {
  return request({
    url: querysearchlistApi,
    method: 'get',
    data
  })
}
export async function mylist(data) {
  return request({
    url: mylistApi,
    method: 'get',
    data
  })
}
export async function userDatas(params) {
  return request({
    url: userOptApi,
    method: 'post',
    data: params,
  })
}
export async function queryPdf(params) {
  return request({
    url: querypdfApi,
    method: 'get',
    data: params,
  })
}

import { request, config } from 'utils'
const {api : {querypt, querysearchattApi, querysearchlistApi}} = config;

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
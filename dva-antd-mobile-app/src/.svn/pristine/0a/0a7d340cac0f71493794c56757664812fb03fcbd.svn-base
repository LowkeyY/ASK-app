import { request, config, getMockData, getInfoWord } from 'utils'

const {api : {querylist,userOptApi}} = config

export async function getLists(data) {
    return request({
        url: querylist,
        method: 'get',
        data,
    })
}
export async function userDatas(params) {
  return request({
    url: userOptApi,
    method: 'post',
    data: params,
  })
}

import { request, config } from 'utils'

const {api} = config
const {userInfo, userLogout, userLogin, queryuserlist} = api

export async function user(params) {
  return request({
    url: userInfo,
    method: 'get',
    data: params,
  })
// return {"pageFontsize":"large","user":{"id":"0","nickname":"列兵","email":"wangfulin@timetang.com","roles":"系统管理员，设备资料版主","name":"系统管理员","dept":"-","integral":7}}
}

export async function logout(params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export async function query(params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export async function queryusers(params) {
  return request({
    url: queryuserlist,
    method: 'get',
    data: params,
  })
}

import { request, config } from 'utils'

const {api} = config
const {userInfo, userLogout, userLogin} = api

export async function user(params) {
    /*  const user = {
        id : "0",
        name : "系统管理员",
        dept : "-",
        integral : 7,
        roles : "系统管理员，设备资料版主",
        email : "wangfulin@timetang.com",
        nickname : "列兵"
      }
      return {user , pageFontsize :"large"};*/
    return request({
        url: userInfo,
        method: 'get',
        data: params,
    })
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

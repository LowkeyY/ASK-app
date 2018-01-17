import { request, config } from 'utils'

const {api} = config
const {userInfo, userLogout, userLogin, queryuserlist, userOptApi} = api

export async function user(params) {
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

export async function queryusers(params) {
    return request({
        url: queryuserlist,
        method: 'get',
        data: params,
    })
}

export async function userDatas(params) {
    return request({
        url: userOptApi,
        method: 'post',
        data: params,
    })
}

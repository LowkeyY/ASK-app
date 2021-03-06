import { request, config } from 'utils'

const {api} = config
const {userLogin} = api

export async function login(data, isCNDefined = false) {
    return request({
        url: userLogin,
        method: 'post',
        data,
        isCNDefined
    })
}

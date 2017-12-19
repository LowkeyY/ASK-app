import { request, config } from 'utils'
const {api : {querypt, queryuser}} = config;

export async function query() {
    return request({
        url: querypt,
        method: 'get'
    })
}
export async function queryu(data) {
    return request({
        url: queryuser,
        method: 'get',
        data,
    })
}
import { request, config } from 'utils'
const {api : {querycontent, querycommends}} = config
export async function getContent(data) {
    return request({
        url: querycontent,
        method: 'get',
        data,
    })
}
export async function getCommends(data) {
    return request({
        url: querycommends,
        method: 'get',
        data,
    })
}
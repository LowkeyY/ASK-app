import { request, config } from 'utils'
import { getMockData, getHotWord, getInfoWord } from 'utils'

const {api : {typequery}} = config

export async function query(params) {
    return request({
        url: typequery,
        method: 'get',
        data: params,
    })
}

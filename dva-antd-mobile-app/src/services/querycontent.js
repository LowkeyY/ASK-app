import { request, config} from 'utils'
const {api : {querycontent}} = config
export async function getContent (data) {
  return request({
    url: querycontent,
    method: 'get',
    data,
  })
}

import { request, config } from 'utils'
import { getMockData, getHotWord, getInfoWord } from 'utils'

const {api} = config
const {dashboard} = api

export async function query(params) {
    /*  const data = Object.assign({}, getMockData("1")),
        title = data.title;
      delete data.title;
      let test1 = "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1655439,3201906256&fm=58",
        test2 = "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=75182295,1003173372&fm=58",
        test3 = "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2632505681,1403153935&fm=58",
        test4 = "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=706415973,3181049443&fm=58";
      return {
        hasNews: false,
        modules: [
          {
            id: 1,
            text: "交流论坛",
            icon: test1
          },
          {
            id: 2,
            text: "经验案例",
            icon: test2
          },
          {
            id: 3,
            text: "设备资料",
            icon: test3
          },
          {
            id: 4,
            text: "知识文库",
            icon: test4
          },
        ],
        lists: [{
          id: 1,
          title: "交流论坛",
          icon: test1,
          items: Array.from(new Array(10)).map((_, i) => Object.assign({
            title: `${title} no.${++i}`
          }, data))
        }],
        notes: getInfoWord(0),
        hotWords: getHotWord(),
      }*/
    return request({
        url: dashboard,
        method: 'get',
        data: params,
    })
}

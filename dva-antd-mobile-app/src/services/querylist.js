import { request, config, getMockData, getInfoWord } from 'utils'

const {api : {querylist}} = config

let start = 1,
    total = 20;
export async function getLists(data) {
    /*  if (start > total)
        start = 1;
      const {moduleId = "1"} = data;
      let newData = [];
      if (moduleId < 5) {
        const {title="test", content = "" ,...props} = getMockData(moduleId);
        newData = Array.from(new Array(10), () => Object.assign({
          title: title + (start++)
        }, props)
        )
      } else if (moduleId == 5) {
        newData = Array.from(new Array(4)).map((_ , index) =>{
            const {content = "" ,...props} = getMockData(++index);
            return Object.assign({}, props);
        })
      } else if (moduleId == 6) {
         newData = getInfoWord()
      }
      
      return {
        data: newData,
        totalNumber: total
      }*/
    return request({
        url: querylist,
        method: 'get',
        data,
    })
}

/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
export default modelExtend(pageModel, {
  namespace:'mysets',
  state: {
    userIcon:[
      {
        url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
        id: '2121'
      }
    ]
  }
})


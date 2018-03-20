/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
export default modelExtend(pageModel, {
  namespace:'preview',
  state:{
    files:{}
  }
})

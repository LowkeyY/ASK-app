/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'


export default modelExtend(pageModel, {
  namespace: 'test',

  state: {
  	currentItem: {},
  	modalVisible : false
  }
})
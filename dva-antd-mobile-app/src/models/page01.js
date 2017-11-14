/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'


export default modelExtend(pageModel, {
  namespace: 'page01',

  state: {
    leftContentValue: {},
    queryValues : 1,
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  }
})

/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'


export default modelExtend(pageModel, {
  namespace: 'page02',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  }
})

/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'mine',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  }
})

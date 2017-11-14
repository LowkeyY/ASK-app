/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'


export default modelExtend(pageModel, {
  namespace: 'mysets',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  }
})


import { routerRedux } from 'dva/router'
import { login } from 'services/login'

import modelExtend from 'dva-model-extend'
import { pageModel } from './common'


export default modelExtend(pageModel, {
  namespace: 'login',

  state:true,
  reducers:{
    'disabled'(state){
     return state= !state;
    }
  }
})


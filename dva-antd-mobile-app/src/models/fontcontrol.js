/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
export default modelExtend(pageModel,{
  namespace:'fontcontrol',
  state:'20px',
  reducers:{
     'small'(state){
          state='16px';
          return state
     },
    'normal'(state){
      state='20px';
      return state
    },
   'big'(state){
      state='30px';
      return state
    }
  }
})


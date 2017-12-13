import React from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WhiteSpace} from 'antd-mobile';
import {Nav,BaseLine} from 'components/Layout'
import MyEditor from 'components/editor/index'
import InputFoot from 'components/inputfoot/inputfoot'
import Discuss from '../discuss/index'
import DetailsComponent from '../detailscomponent/index'

function Details({loading , dispatch , details , app }) {
  const { isShowEditor,isShowInputFoot} = app
  return(
    <div>
      <Nav dispatch={dispatch} title="详情"/>
      <DetailsComponent />
      <WhiteSpace size='sm'/>
      <Discuss/>
      <BaseLine />
      <InputFoot isShowInputFoot={isShowInputFoot} dispatch={dispatch}/>
      <MyEditor isShowEditor={isShowEditor} dispatch={dispatch}/>
    </div>
  )
}
export default connect(({ details, loading , app}) => ({ details, loading , app}))(Details);

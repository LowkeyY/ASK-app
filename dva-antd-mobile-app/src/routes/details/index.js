import React from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WhiteSpace } from 'antd-mobile';
import { Nav, BaseLine } from 'components/Layout'
import MyEditor from 'components/editor/index'
import InputFoot from 'components/inputfoot/inputfoot'
import Discuss from '../discuss/index'
import DetailsComponent from '../detailscomponent/index'

function Details({loading, dispatch, details}) {

    const {currentContent, currentComments,isShowEditor, isShowInputFoot,placeholder, ...props} = details;
    const {isCollect} = currentContent
    console.log(isCollect)
    const contentProps = {
            ...props,
            currentContent,
            dispatch
        },
        commendProps = {
            ...props,
            currentComments,
            dispatch
    }
    return (
        <div>
          <Nav
               dispatch={ dispatch }
               {...props}
               isCollect={ isCollect } />
          <DetailsComponent contentProps={ contentProps } />
          <WhiteSpace size='sm' />
          <Discuss commendProps={ commendProps } />
          <BaseLine />
          <InputFoot isShowInputFoot={ isShowInputFoot } dispatch={ dispatch } currentComments={ currentComments } />
          <MyEditor isShowEditor={ isShowEditor } dispatch={ dispatch } placeholder={placeholder}/>
        </div>
    )
}
export default connect(({details, loading}) => ({
    details,
    loading,
}))(Details);

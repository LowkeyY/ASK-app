import React from 'react'
import {connect} from 'dva';
import {routerRedux, Icon} from 'dva/router';
import {WhiteSpace, ActivityIndicator} from 'antd-mobile';
import {Nav, BaseLine} from 'components/Layout'
import MyEditor from 'components/editor/index'
import InputFoot from 'components/inputfoot/inputfoot'
import Discuss from '../discuss/index'
import DetailsComponent from '../detailscomponent/index'
import { WaterMark} from 'components/Layout'
import './index.less'

function Details({loading, dispatch, details}) {
  const {currentContent, currentComments, isShowEditor, isShowInputFoot, placeholder, is404, animating, currentRecommentId,editorState,theUsers, ...props} = details;
  const contentProps = {
      ...props,
      currentContent,
      dispatch
    },
    commendProps = {
      ...props,
      currentComments,
      dispatch
    },
    headerProps = {
      ...props,
      dispatch
    };
  const {id, hasDeleteAuth, moduleId} = props;
  if (moduleId == "4") {
    //论坛
    headerProps.hasDeleteAuth = hasDeleteAuth && !is404
    if (!is404)
      headerProps.handleClick = () => {
        dispatch({
          type: 'details/deleteContent',
          payload: {
            id: id
          }
        })
      };
  }
  if (moduleId == "1" || moduleId == "2") {
    //文库 或 案例
    headerProps.showCollect = !is404;
    if (!is404) {
      headerProps.isCollect = currentContent.isCollect;
      headerProps.handleClick = (isCollect) => {
        dispatch({
          type: 'details/collect',
          payload: {
            value: isCollect ? 1 : 0,
            id: id
          }
        })
        dispatch({
          type: "mylist/removeNotCollection",
          payload: {
            itemId: id
          }
        })
      }
    }
  }
  const getAddUser = (users = []) => {
    const result = [];
    users.map(_ => {
      result.push(_.value)
    })
    return result.join("|");
  }
  const handleOnSubmit = (contents, files, emailControl,isOriginal) => {
    const params = {
      moduleId,
      contents,
      commentId: currentRecommentId,
      contentId: id,
      emailControl,
      isOriginal,
      addUsers: getAddUser(theUsers),
    }
    dispatch({
      type: 'details/comment',
      payload: {
        params,
        files

      }
    })
    dispatch({
      type: 'details/updateState',
      payload: {
        animating: true
      }
    })
  }
  const Focus = (state) => {
    state.focus()
  }
  const editorProps={
    editorState,
    isShowEditor,
    dispatch,
    placeholder,
    theUsers
  }

  return (
    <div>
    <div className="details-container">
      <Nav {...headerProps} />
      {is404 ? (
        <div className="page-content-error">
          <img src={require('themes/images/404.png')} alt=""/>
        </div>
      ) : (
        <div>
          <div  className="page-content-main">
          <WaterMark/>
          <DetailsComponent contentProps={contentProps}/>
          <WhiteSpace size='sm'/>
          <Discuss commendProps={commendProps} {...props} />
          <BaseLine/>
          </div>
          <InputFoot dispatch={dispatch} currentComments={currentComments} isShowInputFoot={isShowInputFoot}/>
        </div>
      )}

      <ActivityIndicator toast
                         text="发送中..."
                         animating={animating}/>
    </div>
      <MyEditor {...editorProps} onSubmit={handleOnSubmit} />
    </div>
  )
}
export default connect(({details, loading}) => ({
  details,
  loading,
}))(Details);

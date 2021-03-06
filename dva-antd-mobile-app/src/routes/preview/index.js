import React from 'react'
import {connect} from 'dva';
import {Icon, Button, List,ActivityIndicator} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import ForumAuthor from 'components/forumauthor/index'
import DiscussFoot from 'components/discussfoot/index'
import Nav from 'components/Layout/nav'
import { Warnings} from 'components/Layout'
import pagestyles from 'themes/content.less'
import styles from './index.less'


const PrefixCls = 'preview';
const Item = List.Item;
function Preview({loading, dispatch, preview,app,creates={}}) {
  const {currentParams={},preivewPlate,files,animating,emailControl}=creates,
    {theTitle,theContents,thePlate,theTechs,theUsers}=currentParams
  const {userData: {pageFontsize},user} = app,
    getDate=()=>{//获取当前时间
      const myDate = new Date(),
        year=myDate.getFullYear(),
        month=myDate.getMonth()+1,
        day=myDate.getDate(),
        hours=myDate.getHours(),
        minutes=myDate.getMinutes(),
        seconds=myDate.getSeconds()
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
    forumAuthorProps={
      avatars:user.userPic,
      grade:user.grade,
      author:user.userName,
      creates:getDate()
    },
    discussFootProps={
      srcoes:user.integral,
      plates:creates.preivewPlate

    }

  const handlePreviewSendClick = () => {
      const data = {
       title:theTitle,
        boardId: thePlate,
        selectTechs: theTechs.join("|"),
        addUsers: theUsers.join("|"),
        contents:theContents,
        emailControl,
        fromPreview : true
      }
    const params={
      ...data,
    }
      dispatch({
        type: 'creates/updateState',
        payload: {
          animating:true
        }
      })
      dispatch({
        type: 'creates/submit',
        payload: {
          params
        }
      })
    },
    renderNavRight = () => {
      return <Button type="ghost" inline size="small" onClick={handlePreviewSendClick}>发送</Button>
    },
    createMarkup = () => {
      return {
        __html: theContents
      };
    };

  return (
    <div>
      <Nav dispatch={dispatch} title={`预览`} renderNavRight={renderNavRight()}/>
      <List>
        <Item wrap>
          <h5 className={styles[`${PrefixCls}-title`]}>{theTitle}</h5>
        </Item>
      </List>
      <ForumAuthor {...forumAuthorProps}/>
      <DiscussFoot {...discussFootProps}/>
      <Warnings/>
      <div className={`page-content ${pageFontsize}`} style={{overflow: 'hidden', background: '#fff'}}>
        <div dangerouslySetInnerHTML={createMarkup()}/>
      </div>
      <ActivityIndicator animating={animating} toast  text="请等待..."/>
    </div>
  )
}

export default connect(({loading, dispatch, preview,app,creates}) => ({
  loading, dispatch, preview,app,creates
}))(Preview)

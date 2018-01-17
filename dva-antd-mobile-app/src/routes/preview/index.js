import React from 'react'
import {connect} from 'dva';
import {Icon, Button, List} from 'antd-mobile';
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

  const {currentParams={},preivewPlate=''}=creates,
    {data,contents}=preview,
    {theTitle='预览',theContents='预览'}=currentParams
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
      dispatch({
        type: 'creates/createbbsx',
        payload: {
          ...data,
          contents
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
    </div>
  )
}

export default connect(({loading, dispatch, preview,app,creates}) => ({
  loading, dispatch, preview,app,creates
}))(Preview)

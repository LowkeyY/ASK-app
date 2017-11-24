import React from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List } from 'antd-mobile';
import Nav from '../../components/Layout/navbar'
import ForumAuthor from '../../components/forumauthor/index'
import SecrecyAgreement from '../../components/secrecyagreement/secrecyagreement'
import WaterMark from '../../components/watermark/index'
import Discuss from '../discuss/index'
import styles from './index.less'
const Item = List.Item;
function ForumDetails({loading,dispatch,forumdetails}) {
  const goBack = ()=> {
    dispatch(routerRedux.goBack())
  }
  const Prefixcls ='forumdetails';
  return(
    <div>
      <Nav goBack={goBack} title="帖子详情"/>
      <List><Item wrap><h5 className={styles[`${Prefixcls}-title`]}>【故障直通车】CCTV监控系统— 4 摄像机画面夜间模糊</h5></Item></List>
      <ForumAuthor/>
      <List><Item><SecrecyAgreement/></Item></List>
      <div className={styles[`${Prefixcls}-content`]}>
        sdfsdfsdff
        <WaterMark/>
      </div>
      <Discuss/>
    </div>
  )
}
export default connect(({ forumdetails, loading }) => ({ forumdetails, loading }))(ForumDetails);

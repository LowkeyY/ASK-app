import React from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List } from 'antd-mobile';
import Nav from '../../components/Layout/navbar'
import ForumAuthor from '../../components/forumauthor/index'
import SecrecyAgreement from '../../components/secrecyagreement/secrecyagreement'
import WaterMark from '../../components/watermark/index'
import {getMockData} from '../../utils/index'
import BaseLine from '../../components/Layout/baseline'
import DiscussFoot from '../../components/discussfoot/index'
import styles from './index.less'
import pagestyles from 'themes/content.less'

const currentData = getMockData(1);
const {title,date,author,dept,content,wtype,stype,keywords,snum,isnew} = currentData;
const Item = List.Item;
function ForumDetails({loading , dispatch , forumdetails , app }) {
  const {pageFontsize} = app;
  const goBack = ()=> {
    dispatch(routerRedux.goBack())
  }, goDiscuss=()=>{
    dispatch(routerRedux.push({ pathname: '/discuss' }))
  },
    createMarkup=()=> { return {__html: content}; };
  const Prefixcls ='forumdetails';
  return(
    <div>
      <Nav goBack={goBack} title="帖子详情"/>
      <List><Item wrap><h5 className={styles[`${Prefixcls}-title`]}>{title}</h5></Item></List>
      <ForumAuthor {...currentData}/>
      <List><Item><SecrecyAgreement/></Item></List>
      <div className={`page-content ${pageFontsize}`}>
        <div dangerouslySetInnerHTML={createMarkup()} />
        <WaterMark/>
      </div>
      <BaseLine/>
      <DiscussFoot {...currentData} goDiscuss={goDiscuss}/>
    </div>
  )
}
export default connect(({ forumdetails, loading , app}) => ({ forumdetails, loading , app}))(ForumDetails);

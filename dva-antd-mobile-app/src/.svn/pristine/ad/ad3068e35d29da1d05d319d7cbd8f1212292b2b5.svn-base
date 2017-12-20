
import React from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List,WhiteSpace} from 'antd-mobile';
import ForumAuthor from '../../components/forumauthor/index'
import {WaterMark , Warnings , BaseLine , Headertitle,Nav} from 'components/Layout'
import {getMockData} from '../../utils/index'
import MyEditor from 'components/editor/index'
import DiscussFoot from '../../components/discussfoot/index'
import InputFoot from 'components/inputfoot/inputfoot'
import Discuss from '../discuss/index'
import styles from './index.less'
import pagestyles from 'themes/content.less'

const currentData = getMockData(1);
const {title,date,author,dept,content,wtype,stype,keywords,snum,isnew} = currentData;

const Item = List.Item;
function ForumDetails({loading , dispatch , forumdetails , app }) {
  const {pageFontsize} = app,Prefixcls ='forumdetails';
  const { isShowEditor,isShowInputFoot} = app,
    createMarkup=()=> { return {__html: content}; };
  return(
    <div>
      <Nav dispatch={dispatch} title="帖子详情"/>
      <List><Item wrap><h5 className={styles[`${Prefixcls}-title`]}>{title}</h5></Item></List>
      <ForumAuthor {...currentData}/>
      <DiscussFoot {...currentData} />
      <Warnings/>
      <div className={`page-content ${pageFontsize}`} style={{overflow:'hidden'}}>
        <div dangerouslySetInnerHTML={createMarkup()} />
        <WaterMark/>
      </div>
      <WhiteSpace size='sm'/>
      <Discuss/>
      <BaseLine />
      <InputFoot isShowInputFoot={isShowInputFoot} dispatch={dispatch}/>
      <MyEditor isShowEditor={isShowEditor} dispatch={dispatch}/>
    </div>
  )
}
export default connect(({ forumdetails, loading , app}) => ({ forumdetails, loading , app}))(ForumDetails);

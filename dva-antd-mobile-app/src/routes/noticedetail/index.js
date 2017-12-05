import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {List,Icon } from 'antd-mobile';
import Nav from '../../components/Layout/navbar';
import NoticeItem from './componenet/noticeitem'
import {getInfoWord} from 'utils'
const Item = List.Item , Brief = Item.Brief;

function NoticeDetail({noticedetail,loading,dispatch,app}) {
  const obj=getInfoWord();
  const {pageFontsize}=app;
  const goBack = ()=> {
    dispatch(routerRedux.goBack())
  };
  return(
    <div>
    <Nav goBack={goBack} title="全部公告"/>
      <List>
        {
          obj.map((i,index)=>
            <NoticeItem key={i} obj={obj[index]} pageFontsize={pageFontsize}/>
          )
        }

      </List>
    </div>
  )
}
export default connect(({ noticedetail, loading,app }) => ({ noticedetail, loading,app }))(NoticeDetail)

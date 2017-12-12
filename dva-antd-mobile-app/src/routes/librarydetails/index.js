import React from 'react';
import { List,Accordion,WhiteSpace  } from 'antd-mobile';
import Nav from '../../components/Layout/navbar'
import CaseContentTitle from '../../components/contenttitle/contenttitle'
import SecrecyAgreement from '../../components/secrecyagreement/secrecyagreement'
import WaterMark from '../../components/watermark/index'
import BaseLine from '../../components/Layout/baseline'
import DiscussFoot from '../../components/discussfoot/index'
import Discuss from '../discuss/index'
import InputFoot from 'components/inputfoot/inputfoot'
import MyEditor from 'components/editor/index'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less'
import {getMockData} from 'utils/index'
function LibraryDetails({loading,dispatch,librarydetails,app}) {
  // const  {currentPage:{title}} = librarydetails;
  const {title,date,author, dept, fileName, fileUrl,keywords , stype}=getMockData(4)
  const { isShowEditor,isShowInputFoot} = app;
  const Item = List.Item;
  const Brief = Item.Brief;
  const datas = [];
  const goBack = ()=> {
      dispatch(routerRedux.goBack())
    },
    handleAtt = () => {
      dispatch(routerRedux.push({ pathname: '/pdfcontent' , query : {fileUrl : fileUrl}}))
    },
    goDiscuss=()=>{
      dispatch(routerRedux.push({ pathname: '/discuss' }))
    }
  return(
    <div>
      <Nav goBack={goBack} title="文库详情"/>
      <div>
        <CaseContentTitle casecontenttitle={title}/>
      </div>
      <List><Item><SecrecyAgreement/></Item></List>

          <List>
            <Item extra={author} wrap>编制者</Item>
            <Item extra={dept} wrap>部门</Item>
            <Item extra={stype} wrap>所属类型</Item>
            <Item extra={date} wrap>发布时间</Item>
            <Item extra={keywords} wrap>关键索引词</Item>
          </List>

      <WhiteSpace size='sm'/>

      <List>
        <Item arrow="horizontal" onClick={handleAtt.bind(null , fileUrl)}>{fileName}</Item>
      </List>

      <WhiteSpace size='sm'/>
      <div className={styles['casedetail-content']}>
        {/*<WaterMark/>*/}
      </div>
      <Discuss/>
      <WhiteSpace size='lg'/>
      <BaseLine/>
      {/*<DiscussFoot goDiscuss={goDiscuss}/>*/}
      <InputFoot isShowInputFoot={isShowInputFoot} dispatch={dispatch}/>
      <MyEditor isShowEditor={isShowEditor} dispatch={dispatch}/>
    </div>
  )
}

export default connect(({ librarydetails, loading,app }) => ({ librarydetails, loading,app }))(LibraryDetails);

import React from 'react';
import { List,Accordion,WhiteSpace,Brief} from 'antd-mobile';
import CaseContentTitle from '../../components/contenttitle/contenttitle'
import {WaterMark , Warnings , BaseLine , Headertitle,Nav} from 'components/Layout'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyEditor from 'components/editor/index'
import InputFoot from 'components/inputfoot/inputfoot'
import Discuss from '../discuss/index'
import styles from './index.less'
import pagecontentstyles from 'themes/content.less'
import {getMockData} from 'utils/index'
// function CaseDetail({loading,dispatch,casedetail , app}) {
//   const { title, date, author, dept, content, wtype, stype, keywords, snum, isnew } = getMockData(2);
//   const { pageFontsize } = app;
//   // const { currentPage: { content, title, imgs } } = casedetail;
//   const Item = List.Item;
//   const Brief = Item.Brief;
//   const datas = [];
//   const goBack = ()=> {
//     dispatch(routerRedux.goBack())
//   },
//   handleAtt = () => {
//     dispatch(routerRedux.push({ pathname: '/pdfcontent' }))
//   },
//   goDiscuss=()=>{
//     dispatch(routerRedux.push({ pathname: '/discuss' }))
//   },
//   createMarkup=()=> { return {__html: content}; };
//   return(
//     <div>
//       <Header {...{dispatch : dispatch , title : "案例详情"}}/>
//       <div className="page-body">
//         <CaseContentTitle casecontenttitle={title}/>
//       </div>
//       <Warnings/>
//       <Accordion className="my-accordion">
//         <Accordion.Panel header="案例信息">
//       <List>
//         <Item extra={author} wrap>编制者</Item>
//         <Item extra={author} wrap>作者</Item>
//         <Item extra={dept} wrap>部门</Item>
//         <Item extra={wtype} wrap>分系统</Item>
//         <Item extra={stype} wrap>所属类型</Item>
//         <Item extra={snum} wrap>设备型号</Item>
//         <Item extra={date} wrap>发布时间</Item>
//         <Item extra={keywords} wrap>关键索引词</Item>
//       </List>
//         </Accordion.Panel>
//       </Accordion>
//       <WhiteSpace size='sm'/>
//       <Accordion className="my-accordion">
//         <Accordion.Panel header="附件">
//           <List>
//             <Item arrow="horizontal" onClick={handleAtt}>Sample document.pdf</Item>
//           </List>
//         </Accordion.Panel>
//       </Accordion>
//       <WhiteSpace size='sm'/>
//       <div className={`page-content ${pageFontsize}`}>
//         <div dangerouslySetInnerHTML={createMarkup()} />
//         <WaterMark/>
//       </div>
//       <BaseLine/>
//       <DiscussFoot goDiscuss={goDiscuss}/>
//     </div>
//   )
// }
function CaseDetail({loading,dispatch,casedetail,app}) {
  const { title, date, author, dept, content, wtype, stype, keywords, snum, isnew } = getMockData(2);
  const { pageFontsize } = app;
  const { isShowEditor,isShowInputFoot} = app;
  const prop={isShowEditor,dispatch}
  const Item = List.Item;
  const Brief = Item.Brief;
  const datas = [],
    handleAtt = () => {
      dispatch(routerRedux.push({ pathname: '/pdfcontent' }))
    },
    createMarkup=()=> { return {__html: content}; }
  return(
    <div>
      <Nav dispatch={dispatch} title=" 案例详情"/>
      <div>
        <CaseContentTitle casecontenttitle={title}/>
      </div>
      {/*<DiscussFoot />*/}
      <Warnings/>
      <Accordion className="my-accordion">
        <Accordion.Panel header="案例信息">
          <List>
            <Item extra={author} wrap>编制者</Item>
            <Item extra={author} wrap>作者</Item>
            <Item extra={dept} wrap>部门</Item>
            <Item extra={wtype} wrap>分系统</Item>
            <Item extra={stype} wrap>所属类型</Item>
            <Item extra={snum} wrap>设备型号</Item>
            <Item extra={date} wrap>发布时间</Item>
            <Item extra={keywords} wrap>关键索引词</Item>
          </List>
        </Accordion.Panel>
      </Accordion>
      <WhiteSpace size='sm'/>
      <Accordion className="my-accordion">
        <Accordion.Panel header="附件">
          <List>
            <Item arrow="horizontal" onClick={handleAtt}>Sample document.pdf</Item>
          </List>
        </Accordion.Panel>
      </Accordion>
      <WhiteSpace size='sm'/>
      <div className={`page-content ${pageFontsize}`} style={{overflow:'hidden'}}>
        <div dangerouslySetInnerHTML={createMarkup()} />
        <WaterMark/>
      </div>
      <WhiteSpace size='sm'/>
      <Discuss />
      <BaseLine/>
      <InputFoot isShowInputFoot={isShowInputFoot} dispatch={dispatch}/>
      <MyEditor isShowEditor={isShowEditor} dispatch={dispatch} />
    </div>
  )
}
export default connect(({ casedetail, loading  , app}) => ({ casedetail, loading  , app}))(CaseDetail);

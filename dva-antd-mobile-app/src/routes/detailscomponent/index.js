import React from 'react'
import {connect} from 'dva';
import {List, WhiteSpace,Accordion} from 'antd-mobile';
import ForumAuthor from 'components/forumauthor/index'
import {WaterMark, Warnings, BaseLine, Headertitle, Nav} from 'components/Layout'
import DiscussFoot from 'components/discussfoot/index'
import CaseContentTitle from 'components/contenttitle/contenttitle'
import {getMockData} from '../../utils/index'
import styles from './index.less'
import pagestyles from 'themes/content.less'

const currentData = getMockData(1);
const {title, date, author, dept, content, wtype, stype, keywords, snum, isnew} = currentData;
const { title2, date2, author2, dept2, content2, wtype2, stype2, keywords2, snum2, isnew2 } = getMockData(2);
const {title4,date4,author4, dept4, fileName4, fileUrl4,keywords4 , stype4}=getMockData(4)
const Item = List.Item;


function DetailsComponent(app) {
  const {pageFontsize} = app, Prefixcls = 'details-component', createMarkup=()=> { return {__html: content}; };
  // const handleAtt = () => {
  //   dispatch(routerRedux.push({ pathname: '/pdfcontent' , query : {fileUrl : fileUrl}}))
  // }
  const forumdetails = () => {
    return (
      <div>
        <div>
          <List><Item wrap><h5 className={styles[`${Prefixcls}-title`]}>{title}</h5></Item></List>
          <ForumAuthor {...currentData}/>
          <DiscussFoot {...currentData} />
          <Warnings/>
          <div className={`page-content ${pageFontsize}`} style={{overflow: 'hidden'}}>
            <div dangerouslySetInnerHTML={createMarkup()}/>
            <WaterMark/>
          </div>
        </div>
      </div>
    )
  }
  const casedetails = ()=>(
    <div>
      <div>
        <CaseContentTitle casecontenttitle={title2}/>
      </div>
      <Warnings/>
      <Accordion className="my-accordion">
        <Accordion.Panel header="案例信息">
          <List>
            <Item extra={author2} wrap>编制者</Item>
            <Item extra={author2} wrap>作者</Item>
            <Item extra={dept2} wrap>部门</Item>
            <Item extra={wtype2} wrap>分系统</Item>
            <Item extra={stype2} wrap>所属类型</Item>
            <Item extra={snum2} wrap>设备型号</Item>
            <Item extra={date2} wrap>发布时间</Item>
            <Item extra={keywords2} wrap>关键索引词</Item>
          </List>
        </Accordion.Panel>
      </Accordion>
      <WhiteSpace size='sm'/>
      <Accordion className="my-accordion">
        <Accordion.Panel header="附件">
          <List>
            <Item arrow="horizontal" >Sample document.pdf</Item>
          </List>
        </Accordion.Panel>
      </Accordion>
      <WhiteSpace size='sm'/>
      <div className={`page-content ${pageFontsize}`} style={{overflow:'hidden'}}>
        <div dangerouslySetInnerHTML={createMarkup()} />
        <WaterMark/>
      </div>
    </div>
  )


  const librarydetails =()=>{
    return(
      <div>
          <CaseContentTitle casecontenttitle={title4}/>
        <Warnings/>
        <List>
          <Item extra={author4} wrap>编制者</Item>
          <Item extra={dept4} wrap>部门</Item>
          <Item extra={stype4} wrap>所属类型</Item>
          <Item extra={date4} wrap>发布时间</Item>
          <Item extra={keywords4} wrap>关键索引词</Item>
        </List>
        <WhiteSpace size='sm'/>
        <List>
          <Item arrow="horizontal" >{fileName4}</Item>
        </List>
      </div>
    )
  }
  const renderComponent=()=>{
    switch (1){
      case 4: return forumdetails() ;
      case 1: return casedetails() ;
      case 2: return librarydetails() ;
    }
  }
  return(
    renderComponent()
  )

}

export default connect(({app}) => ({app}))(DetailsComponent);

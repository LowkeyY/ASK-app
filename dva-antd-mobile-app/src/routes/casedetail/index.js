import React from 'react';
import { List,Accordion,WhiteSpace  } from 'antd-mobile';
import Nav from '../../components/Layout/navbar'
import CaseContentTitle from '../../components/contenttitle/contenttitle'
import SecrecyAgreement from '../../components/secrecyagreement/secrecyagreement'
import WaterMark from '../../components/watermark/index'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less'
function CaseDetail({loading,dispatch,casedetail}) {
  console.log(casedetail)
  const { currentPage: { content, title, imgs } } = casedetail;
  const Item = List.Item;
  const Brief = Item.Brief;
  const datas = [];
  const goBack = ()=> {
    dispatch(routerRedux.goBack())
  },
  handleAtt = () => {
    dispatch(routerRedux.push({ pathname: '/pdfcontent' }))
  };
  return(
    <div>
      <Nav goBack={goBack}/>
      <div>
        <CaseContentTitle casecontenttitle={title}/>
      </div>
      <List><Item><SecrecyAgreement/></Item></List>
      <Accordion className="my-accordion">
        <Accordion.Panel header="案例信息">
      <List>
        <Item extra="莱昂纳多" >编制者</Item>
        <Item extra="莱昂纳多" >作者</Item>
        <Item extra="影视部" >部门</Item>
        <Item extra="加速器" >分系统</Item>
        <Item extra="故障维修" >所属类型</Item>
        <Item extra="AE86" >设备型号</Item>
        <Item extra="2017-5-4" >发布时间</Item>
        <Item extra="98K">关键索引词</Item>
      </List>
        </Accordion.Panel>
      </Accordion>
      <WhiteSpace size='sm'/>
      <List>
      <Item arrow="horizontal" onClick={handleAtt}>查看附件</Item>
      </List>
      <WhiteSpace size='sm'/>
      <div className={styles['casedetail-content']}>
            {content}
        <WaterMark/>
      </div>
      <WhiteSpace size='lg'/>
      <WhiteSpace size='lg'/>
      <WhiteSpace size='lg'/>
      <WhiteSpace size='lg'/>
      <WhiteSpace size='lg'/>
    </div>
  )
}

export default connect(({ casedetail, loading }) => ({ casedetail, loading }))(CaseDetail);

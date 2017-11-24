import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux , Link} from 'dva/router';
import { Card, WingBlank, WhiteSpace , Grid , NavBar , Icon , SearchBar , Button , List , NoticeBar , Badge} from 'antd-mobile';
import { Layout } from 'components'
import styles from './index.less';
import HotWords from '../hotwords/index';
import {getLocalIcon} from 'utils'

function Dashboard({
  location , dashboard , loading , dispatch
}) {
  const {Header} = Layout;
  const PrefixCls = "dashboard" ,
    defaultImageSrc = "https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png",
    defaultData = {
      name : '共享手机现身昆明:年租金近4000元不如直接买一台',
      date : '2017年09月10日',
      author : '网易科技',
    };
  let data = [];
  for (let i = 0; i < 5; i++) {
    data.push(defaultData)
  }

  let nodes = [
    {id:"1",text:"交流论坛" , icon : require("themes/images/交流论坛.svg")},
    {id:"2",text:"经验案例" , icon : require("themes/images/经验案例.svg")},
    {id:"3",text:"设备资料" , icon : require("themes/images/设备资料.svg")},
    {id:"4",text:"知识文库" , icon : require("themes/images/知识文库.svg")},
  ];

  const getData = ()=>{
    const datas = [];
    nodes.map((node , index) =>{
      const list = Array.from(new Array(5)).map(_ => defaultData);
      datas.push({
        title : node.text,
        key : node.id,
        list : list,
      })
    });
    return datas;
  }

  const handleItemClick = () =>{
     dispatch(routerRedux.push({pathname:"/casedetail" , query : {froms : "/"}}));
 n }

  const packCards = (datas) => {
    return datas.map((data , index) => {
      const isLast = index === datas.length - 1;
      const Item = List.Item;
      const Brief = Item.Brief;
      return (
        <div style={isLast ? {marginBottom: "1rem"}:{}}>
          <WhiteSpace size="sm" />
          <List renderHeader={() => (<span className={styles[`${PrefixCls}-list-header`]}>{data.title}</span>)}>
              {
                data.list && data.list.map((item , index) => {
                  return index > 1 ?
                    <Item
                      arrow="horizontal"
                      multipleLine
                      onClick={handleItemClick}
                      key={`${data.id}-${index}`}
                      wrap
                    >
                        <span className={styles[`${PrefixCls}-list-body`]}>{defaultData.name}</span>
                      <Brief>{`${defaultData.author} - (${defaultData.date})`}</Brief>
                    </Item> :
                    <Item
                      multipleLine
                      onClick={handleItemClick}
                      key={`${data.id}-${index}`}
                      wrap
                      className="special-badge"
                      extra={<Badge text={'新'}/>}
                    >
                        <span className={styles[`${PrefixCls}-list-body`]}>{defaultData.name}</span>
                      <Brief>{`${defaultData.author} - (${defaultData.date})`}</Brief>
                    </Item>
                })
              }
          </List>
          {isLast && <WhiteSpace size="sm" />}
        </div>
      )
    })
  };
  const headerProps = {
      dispatch
  };
  return (
    <div>
      <Header {...headerProps}/>
      <div className={styles[`${PrefixCls}-normal`]}>
      <WingBlank size="sm" >
        <WhiteSpace size="sm" />
        <Grid
          data={nodes}
          columnNum={4}
          renderItem={dataItem => (
            <div className={styles[`${PrefixCls}-img-box`]}>
              <img className={styles[`${PrefixCls}-grid-img`]} src={dataItem.icon} alt="icon" />
              <div className={styles[`${PrefixCls}-grid-title`]}>
                <span>{dataItem.text}</span>
              </div>
            </div>
          )}
          style={{minHeight: '90px' }}
          onClick={(_el, index) => {
            const node = nodes[index];
            dispatch({type :"typequery/updateState" , payload:{selectSys : (--node.id)}});
            dispatch(routerRedux.push({pathname:"/typequery"}))}
          }
      />
      </WingBlank>
      <HotWords />
      <NoticeBar  mode="link" icon={<Icon type={getLocalIcon("/broadcast.svg")}/>} marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }}>
        {defaultData.name + defaultData.name}
      </NoticeBar>
      {packCards(getData())}
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux , Link} from 'dva/router';
import {  WhiteSpace , Grid , Icon ,  Modal , List , NoticeBar , Badge} from 'antd-mobile';
import { Layout } from 'components'
import styles from './index.less';
import HotWords from '../hotwords/index';
import {getLocalIcon , mockGrids , getMockData , getHotWord , getInfoWord} from 'utils'
function Dashboard({
  location , dashboard , loading , dispatch
}) {
  const {Header , BaseLine} = Layout , PrefixCls = "dashboard" , hotwords = getHotWord() , infoWord = getInfoWord(0);
  const {isModalShow}=dashboard;
  const getData = (nodes , data , counts = 10)=>{
    const datas = [];
    nodes.map((node , index) =>{
      const list = Array.from(new Array(counts)).map((_ , i) => {
        let newData = Object.assign({} , data);
        newData.title = newData.title + (i > 0 ? i : "");
        return newData;
      });
      datas.push({
        title : node.text,
        key : node.id,
        list : list,
        icon : node.icon
      })
    });
    return datas;
  };

  const handleItemClick = () =>{
     dispatch(routerRedux.push({pathname:"/forumdetails"}));
  };
  const showNotice=(e)=>{
      e.preventDefault();
    dispatch({
      type:'dashboard/updateState' , payload : {isModalShow : true}
    })
  };
  const onClose =()=>{
    dispatch({
      type:'dashboard/updateState' , payload : {isModalShow : false}
    })
  };

  const onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  const goNoticeDetail=()=>{
    dispatch(routerRedux.push({pathname:"/noticedetail"}));
  };
  const packCards = (datas) => {
    return datas.map((data , index) => {
      const isLast = index === datas.length - 1;
      const Item = List.Item;
      const Brief = Item.Brief;
      return (
        <div
          style={isLast ? {marginBottom: ".1rem"}:{}}>
          <WhiteSpace size="sm" />
          <List renderHeader={() => (<div className={styles[`${PrefixCls}-head-title`]}><img src={data.icon} /><span className={styles[`${PrefixCls}-list-header`]}>{data.title}</span></div>)}>
              {
                data.list && data.list.map((item , index) => {
                  let isNew = item.isNew === true || index <= 1;
                  let result = (
                      <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={handleItemClick}
                        key={`${data.id}-${index}`}
                        wrap
                      >
                        <span className={ styles[`${PrefixCls}-list-body`]+" "+(isNew ? styles[`${PrefixCls}-list-isNew`] : "")}>{item.title}</span>
                        <Brief>{`${item.author} - (${item.date})`}</Brief>
                      </Item>
                    );

                  return !isNew ? result :
                    <Badge text={'新'} corner>
                      {result}
                    </Badge>
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

  const currentData = mockGrids[0];
  return (
    <div>
      <Header {...headerProps}/>
      <div className={styles[`${PrefixCls}-normal`]}>
      <Grid
        data={mockGrids}
        columnNum={4}
        hasLine={false}
        onClick={(_el, index) => {
          const grid = mockGrids[index];
          dispatch({type :"typequery/updateState" , payload:{selectSys : grid.id}});
          dispatch(routerRedux.push({pathname:"/typequery"}))}
        }
      />
        <WhiteSpace size="sm" />
      <HotWords hotwords={hotwords}/>
      <WhiteSpace size="sm" />
        <div className={styles[`${PrefixCls}-noticebar-container`]}>
      <NoticeBar
        onClick={showNotice}
        mode="link" icon={<Icon type={getLocalIcon("/page/notes.svg")}/>}
        marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }}>
        {infoWord.title}
      </NoticeBar>
          <Modal
            visible={isModalShow}
            transparent
            maskClosable={false}
            title="公告"
            footer={[{ text: '关闭',onPress:()=>{onClose()} }]}
            wrapProps={{ onTouchStart: onWrapTouchStart }}
          >
            <div style={{ height: 200, overflowY: 'scroll' }}>
              {infoWord.title}
            </div>
          </Modal>
          <div
            onTouchEnd={goNoticeDetail}
            className={styles[`${PrefixCls}-noticebar-container-btn`]}>
            <Icon  type={getLocalIcon('/page/more.svg')}/>
          </div>
        </div>
      {packCards(getData([currentData] , getMockData(currentData.id)))}
      <BaseLine />
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)

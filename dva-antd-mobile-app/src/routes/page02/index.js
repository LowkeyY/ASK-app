import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Button, WhiteSpace, WingBlank , List} from 'antd-mobile';
import styles from './index.less';

function Page02({
  location , page02 , loading , dispatch
}) {
  const {} = page02;
  const {query : {froms = "/"}} = location , PrefixCls = "page02";

  const handleChange = (types , title)=> {
    if("sets" === types){
        dispatch(routerRedux.push({pathname:"/mysets" , query : {froms : "/page02" , title : "个人设置"}}))
    } else {
        dispatch(routerRedux.push({pathname:"/mylist" , query : {froms : "/page02" , title}}))
    }
  } , defaultImgSrc = require("themes/images/user.png");
  const handleLogout = () =>{
    dispatch(routerRedux.push({pathname:"/login" , query : {froms : "/page02"}}))
  }
  return (
    <div>
      <div className={styles[`${PrefixCls}-header`]}>
        <NavBar
          iconName={false}
        >我的</NavBar>
      </div>
      <div className={styles[`${PrefixCls}-normal`]}>
        <List>
          <List.Item
            className={styles[`${PrefixCls}-list`]}
            arrow="horizontal"
            activeStyle={{backgroundColor:"white"}}
            onClick={handleChange.bind(null , "sets")}
          >
            <div className={styles[`${PrefixCls}-list-sets`]}>
              <div className={styles[`${PrefixCls}-list-sets-img`]}>
                  <img src={defaultImgSrc} alt="icon" />
              </div>
              <div className={styles[`${PrefixCls}-list-sets-title`]}>
                  <span>系统管理员</span>
              </div>
              <div className={styles[`${PrefixCls}-sign`]}>
                  <Button type="primary" inline size="small" style={{ marginRight: '4px',background:"#ff8100" }}>签到+1</Button>
              </div>
            </div>
          </List.Item>
          <List.Item
            thumb={require("themes/images/message.png")}
            arrow="horizontal"
            onClick={handleChange.bind(null , "infos" , "我的消息")}
          >我的消息</List.Item>
          <List.Item
          thumb={require("themes/images/start.png")}
          arrow="horizontal"
          onClick={handleChange.bind(null , "myStores" , "我的收藏案例")}
        >我的收藏案例</List.Item>
          <List.Item
            thumb={require("themes/images/send.png")}
            arrow="horizontal"
            onClick={handleChange.bind(null , "mySend" , "我发布的帖子")}
          >我发布的帖子</List.Item>
          <List.Item
            thumb={require("themes/images/reply.png")}
            arrow="horizontal"
            onClick={handleChange.bind(null , "myreply" , "我回复的帖子")}
          >我回复的帖子</List.Item>
        </List>
        <WhiteSpace size="xl" />
        <Button type="primary"
               onClick={handleLogout.bind(null)}
        >退出登录</Button>
        <WhiteSpace size="xl" />
      </div>
    </div>
  );
}

Page02.propTypes = {
  location: PropTypes.object.isRequired,
  page03: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ page02, loading }) => ({ page02, loading }))(Page02);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Button, WhiteSpace, WingBlank, List } from 'antd-mobile';
import { getUserAvatar } from 'utils'
import styles from './index.less';

function Mine({location, mine, app, loading, dispatch}) {
    const {user} = app,
        PrefixCls = "mine";

    const handleChange = (types, title) => {
            if ("sets" === types) {
                dispatch(routerRedux.push({
                    pathname: "/mysets",
                    query: {
                        title: "个人设置"
                    }
                }))
            } else {
                //4:帖子 , 41 回复的帖子 , 1 : 案例 , 2 : 文库 , 0 : 个人消息
                const pa = {
                    type: types
                };
                if (types.length > 1) {
                    pa.type = types.substr(0, 1);
                    pa.types = types.substr(1, 1);
                }
                dispatch(routerRedux.push({
                    pathname: "/mylist",
                    query: {
                        title,
                        ...pa
                    }
                }))
            }
        },
        defaultImgSrc = require("themes/images/user.png");
    const handleLogout = () => {
        dispatch({
            type: "app/logout"
        })
    }
    return (
        <div>
          <div className={ styles[`${PrefixCls}-header`] }>
            <NavBar iconName={ false }>
              我的
            </NavBar>
          </div>
          <div className={ styles[`${PrefixCls}-normal`] }>
            <List>
              <List.Item className={ styles[`${PrefixCls}-list`] } arrow="horizontal" activeStyle={ { backgroundColor: "white" } } onClick={ handleChange.bind(null, "sets") }>
                <div className={ styles[`${PrefixCls}-list-sets`] }>
                  <div className={ styles[`${PrefixCls}-list-sets-left`] }>
                    <div className={ styles[`${PrefixCls}-list-sets-left-img`] }>
                      <img src={ getUserAvatar(user.userPic) } alt="icon" />
                    </div>
                    <div className={ styles[`${PrefixCls}-list-sets-left-title`] }>
                      <p>
                        { user.userName }
                      </p>
                      <p className={ styles[`${PrefixCls}-list-sets-left-title-honor`] }>
                        身份：<span>{ user.grade }</span>
                      </p>
                    </div>
                  </div>
                  <div className={ styles[`${PrefixCls}-list-sets-right`] }>
                    <div className={ styles[`${PrefixCls}-list-sets-right-integral`] }>
                      积分 <span>{ user.integral }</span>
                    </div>
                  </div>
                </div>
              </List.Item>
              <List.Item thumb={ require("themes/images/我的消息.png") } arrow="horizontal" onClick={ handleChange.bind(null, "0", "我的消息") }>
                我的消息
              </List.Item>
              <List.Item thumb={ require("themes/images/收藏案例.png") } arrow="horizontal" onClick={ handleChange.bind(null, "1", "我收藏的案例") }>
                我收藏的案例
              </List.Item>
              <List.Item thumb={ require("themes/images/收藏文档.png") } arrow="horizontal" onClick={ handleChange.bind(null, "2", "我收藏的文档") }>
                我收藏的文档
              </List.Item>
              <List.Item thumb={ require("themes/images/已发布.png") } arrow="horizontal" onClick={ handleChange.bind(null, "4", "我发布的帖子") }>
                我发布的帖子
              </List.Item>
              <List.Item thumb={ require("themes/images/已回复.png") } arrow="horizontal" onClick={ handleChange.bind(null, "41", "我回复的帖子") }>
                我回复的帖子
              </List.Item>
            </List>
            <Button className={ styles[`${PrefixCls}-list-sets-loginout`] } type="primary" onClick={ handleLogout.bind(null) }>
              退出登录
            </Button>
            <WhiteSpace size="xl" />
          </div>
        </div>
        );
}

Mine.propTypes = {
    location: PropTypes.object.isRequired,
    page03: PropTypes.object,
    loading: PropTypes.object,
};

export default connect(({mine, loading, app}) => ({
    mine,
    loading,
    app
}))(Mine);

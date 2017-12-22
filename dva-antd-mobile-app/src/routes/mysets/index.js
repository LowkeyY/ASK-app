import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import Sets from './sets';
import {NavBar} from 'antd-mobile';

import styles from './index.less';

function Mysets({
                  location, mysets, loading, dispatch, app
                }) {
  const {query: {froms = "/", title = ""}} = location, PrefixCls = "mysets", {url} = mysets
  const {user} = app
  const userInfo = {
    ...user,
    url
  }
  const goBack = () => {
    dispatch(routerRedux.goBack())
  }
  const changeUserIcon=(res)=>{
    dispatch({
      type:'mysets/updateState' , payload : {url : res.path}
    })
  }
  return (
    <div>
      <div className={styles[`${PrefixCls}-header`]}>
        <NavBar leftContent="返回"
                mode="light"
                onLeftClick={goBack}
        >{title}</NavBar>
      </div>
      <div className={styles[`${PrefixCls}-normal`]}>
        <Sets userInfo={userInfo} changeUserIcon={changeUserIcon} dispatch={dispatch}/>
      </div>
    </div>
  );
}

Mysets.propTypes = {
  location: PropTypes.object.isRequired,
  mylist: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({mysets, loading, app}) => ({mysets, loading, app}))(Mysets);

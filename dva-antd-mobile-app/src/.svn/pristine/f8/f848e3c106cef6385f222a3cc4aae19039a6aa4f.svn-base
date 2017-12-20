import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DemoListView from '../test/listView';
import { NavBar } from 'antd-mobile';

import styles from './index.less';

function Mylist({
  location , mylist , loading , dispatch 
}) {
  const {query : {froms = "/" , title = ""}} = location , PrefixCls = "mylist";
  const goBack = ()=> {
    dispatch(routerRedux.goBack())
  }, demoProps = {
      froms : '/mylist',
      dispatch,
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
        <DemoListView {...demoProps}/>
      </div>
    </div>
  );
}

Mylist.propTypes = {
  location: PropTypes.object.isRequired,
  mylist: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ mylist, loading }) => ({ mylist, loading }))(Mylist);



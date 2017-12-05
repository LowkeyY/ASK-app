import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DemoList from '../test/list';
import { NavBar } from 'antd-mobile';
import styles from './index.less';
import EditorBox from 'components/editorbox/index'
function Creates({
  location , creates , loading , dispatch
}) {
  const {query : {froms = "/"}} = location , PrefixCls = "creates";
  const goBack = ()=> {
    dispatch(routerRedux.goBack())
  }
	return (
    <div>
      <div className={styles[`${PrefixCls}-header`]}>
        <NavBar leftContent="返回"
          mode="light"
          onLeftClick={goBack}
        >发帖</NavBar>
      </div>
      <div className={styles[`${PrefixCls}-normal`]}>
        <DemoList/>
      </div>
      <EditorBox/>
    </div>

    );
}

Creates.propTypes = {
	test: PropTypes.object,
	loading: PropTypes.object,
}

export default connect(({ creates, loading }) => ({ creates, loading }))(Creates)

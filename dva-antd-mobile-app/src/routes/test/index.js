import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DemoDrawer from './Drawer';
import DemoList from './list';
import DemoListView from './listView';
import DemoDraft from './draft';
import DemoSwipe from './SwipeAction';
import { Layout } from 'components'
import { NavBar } from 'antd-mobile';
import styles from './index.less';
import { Accordion , Modal, List, InputItem, Switch, Stepper, Range, Button, createTooltip , Toast, WhiteSpace, WingBlank , SwipeAction} from 'antd-mobile';
import Login from '../login/index'
const Item = List.Item;

function test({
  location , test , loading , dispatch
}) {

  const {modalVisible = false} = test;
  const goBack = ()=> {
    dispatch(routerRedux.goBack())
  },showModal = (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    dispatch({type :"test/updateState" , payload:{modalVisible : true}});
  },hideModal = () => {
    dispatch({type :"test/updateState" , payload:{modalVisible : false}});
  }, onOpen = () =>{
    console.log(arguments);
  };
  return (
    <div>
      <Login/>
    </div>

  );
}


test.propTypes = {
	test: PropTypes.object,
	loading: PropTypes.object,
}

export default connect(({ test, loading }) => ({ test, loading }))(test)

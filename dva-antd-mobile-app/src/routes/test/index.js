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
import { Accordion , Badge , Modal, List, InputItem, Switch, Stepper, Range, Button, createTooltip , Toast, WhiteSpace, WingBlank , SwipeAction} from 'antd-mobile';
import CaseDetail from  '../casedetail/index'
import Discuss from '../discuss/index'
import DiscussFoot from '../../components/discussfoot/index'
import LibraryDetails from '../librarydetails/index'
import ForumDeatils from '../forumdetails/index'
import Nav from '../../components/Layout/navbar'
import Login from '../login/index'
import HotWords from '../hotwords/index'
import MyEditor from 'components/editor/index'
const Item = List.Item;

function test() {

  const onChange = (e)=>{
    console.log(e);
  }


  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      <MyEditor/>
    </div>
  );
}


test.propTypes = {
  test: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ test, loading }) => ({ test, loading }))(test)

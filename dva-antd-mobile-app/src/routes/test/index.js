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
import CaseDetail from  '../casedetail/index'
import Discuss from '../../components/discuss/index'
import Nav from '../../components/Layout/navbar'
import Login from '../login/index'
import HotWords from '../hotwords/index'
const Item = List.Item;

function test() {


  return (
    <div>
      <Discuss />
    </div>

  );
}


test.propTypes = {
	test: PropTypes.object,
	loading: PropTypes.object,
}

export default connect(({ test, loading }) => ({ test, loading }))(test)

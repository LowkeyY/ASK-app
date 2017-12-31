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
import { Accordion, Badge, Modal, List, InputItem, Switch, Stepper, Range, Button, createTooltip, Toast, WhiteSpace, WingBlank, SwipeAction } from 'antd-mobile';
import Discuss from '../discuss/index'
import DiscussFoot from '../../components/discussfoot/index'
import Login from '../login/index'
import HotWords from '../hotwords/index'
import Testdiv from './test'
import Iframes from './iframe'
const Item = List.Item;

function test() {

    const onChange = (e) => {
        console.log(e);
    }


    return (
        <div>
          <Iframes url={ "https://ask.nuctech.com/ueditor/jsp/upload/file/20170614/%E5%8F%8C%E5%90%91%E6%B6%B2%E5%8E%8B%E9%94%81%E5%92%8C%E5%B9%B3%E8%A1%A1%E9%98%80%E7%9A%84%E5%8C%BA%E5%88%AB1497411472433034917.pdf" } />
        </div>

        );
}


test.propTypes = {
    test: PropTypes.object,
    loading: PropTypes.object,
}

export default connect(({test, loading}) => ({
    test,
    loading
}))(test)

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
const Item = List.Item;

function test() {

const onChange = (e)=>{
	console.log(e);
}


return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Accordion defaultActiveKey="0" className="my-accordion" onChange={onChange}>
          <Accordion.Panel header="Title 1">
            <List className="my-list">
                <List.Item multipleLine>
			      <Badge text="减" hot style={{ marginLeft: 12 }} />
			      <Badge text="惠" hot style={{ marginLeft: 12 }} />
			      <Badge text="免" hot style={{ marginLeft: 12 }} />
			      <Badge text="反" hot style={{ marginLeft: 12 }} />
			      <Badge text="HOT" hot style={{ marginLeft: 12 }} />
			      <Badge text="减" hot style={{ marginLeft: 12 }} />
			      <Badge text="惠" hot style={{ marginLeft: 12 }} />
			      <Badge text="免" hot style={{ marginLeft: 12 }} />
			      <Badge text="反" hot style={{ marginLeft: 12 }} />
			      <Badge text="HOT" hot style={{ marginLeft: 12 }} />
			      <Badge text="减" hot style={{ marginLeft: 12 }} />
			      <Badge text="惠" hot style={{ marginLeft: 12 }} />
			      <Badge text="免" hot style={{ marginLeft: 12 }} />
			      <Badge text="反" hot style={{ marginLeft: 12 }} />
			      <Badge text="HOT" hot style={{ marginLeft: 12 }} />
			    </List.Item>
            </List>
          </Accordion.Panel>
          <Accordion.Panel header="Title 2" className="pad">this is panel content2 or other</Accordion.Panel>
          <Accordion.Panel header="Title 3" className="pad">
            text text text text text text text text text text text text text text text
          </Accordion.Panel>
        </Accordion>
      </div>
    );
}


test.propTypes = {
	test: PropTypes.object,
	loading: PropTypes.object,
}

export default connect(({ test, loading }) => ({ test, loading }))(test)

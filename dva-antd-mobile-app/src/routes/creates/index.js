import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import DemoList from '../test/list';
import {NavBar,Popover,Icon} from 'antd-mobile';
import { getLocalIcon } from 'utils'
import styles from './index.less';
const Item = Popover.Item;
function Creates({
                   location, creates, loading, dispatch
                 }) {
  const {query: {froms = "/"}} = location, PrefixCls = "creates";
  const goBack = () => {
    dispatch(routerRedux.goBack())
  }
  // state = {
  //   visible: true,
  //   selected: '',
  // };
  // onSelect = (opt) => {
  //   // console.log(opt.props.value);
  //   this.setState({
  //     visible: false,
  //     selected: opt.props.value,
  //   });
  // };
  // handleVisibleChange = (visible) => {
  //   this.setState({
  //     visible,
  //   });
  // };
  return (
    <div>
      <div className={styles[`${PrefixCls}-header`]}>
        <NavBar leftContent="返回"
                mode="light"
                onLeftClick={goBack}
                rightContent={
                  <Popover mask
                           overlayClassName="fortest"
                           overlayStyle={{color: 'currentColor'}}
                           // visible={this.state.visible}
                           overlay={[
                             (<Item key="4" value="scan"
                                    data-seed="logId"><Icon type={getLocalIcon('/page/sendup.svg')}/><span>发送</span></Item>),
                             (<Item key="5" value="special"
                                    style={{whiteSpace: 'nowrap'}}><Icon type={getLocalIcon('/page/preview.svg')}/>预览</Item>),
                             (<Item key="6" value="button ct" >
                               <span style={{marginRight: 5}}><Icon type={getLocalIcon('/page/reset.svg')}/>重置</span>
                             </Item>),
                           ]}
                           align={{
                             overflow: {adjustY: 0, adjustX: 0},
                             offset: [-10, 0],
                           }}
                           // onVisibleChange={this.handleVisibleChange}
                           // onSelect={this.onSelect}
                  >
                    <div style={{
                      height: '100%',
                      padding: '0 15px',
                      marginRight: '-15px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    >
                      <Icon type="ellipsis"/>
                    </div>
                  </Popover>
                }
        >发帖</NavBar>
      </div>
      <div className={styles[`${PrefixCls}-normal`]}>
        <DemoList/>
      </div>
    </div>

  );
}

Creates.propTypes = {
  test: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({creates, loading}) => ({creates, loading}))(Creates)

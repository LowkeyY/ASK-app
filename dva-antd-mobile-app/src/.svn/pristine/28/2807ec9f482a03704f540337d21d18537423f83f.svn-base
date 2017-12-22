import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import BbsEdit from 'components/bbsedit';
import {NavBar, Popover, Icon} from 'antd-mobile';
import {getLocalIcon} from 'utils'
import styles from './index.less';

const Item = Popover.Item;

function Creates({
                   location, creates, loading, dispatch
                 }) {
  const {plates, currentTechs, selectPlate, selectTechs, showSelectMenu, selectedUsers} = creates,
    PrefixCls = "creates";
  const goBack = () => {
      dispatch(routerRedux.goBack())
    },
    plateOnChange = (others = {}) => {
      dispatch({
        type: 'creates/changePlates',
        payload: {
          showSelectMenu: !showSelectMenu,
          ...others
        }
      })
    },
    othersOnChange = (others = {}) => {
      dispatch({
        type: 'creates/updateState',
        payload: {
          showSelectMenu: !showSelectMenu,
          ...others
        }
      })
    },
    handleUserSearchClick = () => {
      dispatch(routerRedux.push({
        pathname: "/searchuser",
        query: {
          tragetState: "creates"
        }
      }));
    };
  const props = {
    plates,
    currentTechs,
    selectPlate,
    selectTechs,
    showSelectMenu,
    othersOnChange,
    handleOK: plateOnChange,
    selectedUsers,
    handleUserSearchClick,
  }
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
                             // (<Item key="4" value="scan"
                             //        data-seed="logId">
                             //   <div className={styles[`${PrefixCls}-send-btn-box`]}><Icon
                             //     type={getLocalIcon('/page/sendup.svg')}/><span>发送</span></div>
                             // </Item>),
                             (<Item key="5" value="special"
                                    style={{whiteSpace: 'nowrap'}}>
                               <div className={styles[`${PrefixCls}-send-btn-box`]}><Icon
                                 type={getLocalIcon('/page/preview.svg')}/><span>预览</span></div>
                             </Item>),
                             (<Item key="6" value="button ct">
                               <div className={styles[`${PrefixCls}-send-btn-box`]}><Icon
                                 type={getLocalIcon('/page/reset.svg')}/><span>重置</span></div>
                             </Item>),
                           ]}
                           align={{
                             overflow: {adjustY: 0, adjustX: 0},
                             offset: [-10, 0],
                           }}

                  >
                    <div style={{
                      height: '100%',
                      padding: '0 15px',
                      marginRight: '-15px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    >
                      <Icon type="ellipsis"/>
                    </div>
                  </Popover>
                }
        >发帖</NavBar>
      </div>
      <div className={styles[`${PrefixCls}-normal`]}>
        <BbsEdit {...props}/>
      </div>
    </div>

  );
}

Creates.propTypes = {
  test: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({creates, loading}) => ({creates, loading}))(Creates)

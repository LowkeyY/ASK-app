import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import BbsEdit from 'components/bbsedit';
import {NavBar, Popover, Icon} from 'antd-mobile';
import {getLocalIcon} from 'utils'
import styles from './index.less';

const Item = Popover.Item;

function Creates({location, creates, loading, dispatch}) {
  const {plates, showSelectMenu, currentTechs, currentParams,editorState} = creates,
    PrefixCls = "creates";

   const update = (params) => {
      const {isShow = null, ...param} = params;
      dispatch({
        type: 'creates/updateParam',
        payload: {
          showSelectMenu: isShow == null ? !showSelectMenu : isShow,
          currentParams: {
            ...currentParams,
            ...param
          }
        }
      })
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
          currentParams: {
            ...currentParams,
            ...others
          }
        }
      })
    },
     titleOnChange=(value)=>{
       dispatch({
         type: 'creates/updateState',
         payload: {
           currentParams: {
             ...currentParams,
             theTitle:value

           }
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
    }

  const props = {
     dispatch,
    plates,
    currentTechs,
    showSelectMenu,
    othersOnChange,
    handleOK: plateOnChange,
    handleUserSearchClick,
    currentParams,
    editorState,
    titleOnChange
  }
  return (
    <div>
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

export default connect(({creates, loading}) => ({
  creates,
  loading
}))(Creates)

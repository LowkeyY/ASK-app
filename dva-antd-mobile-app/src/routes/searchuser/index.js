import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { SearchBar, Button, WhiteSpace, WingBlank, SegmentedControl, List, Radio, NavBar, Toast } from 'antd-mobile'
import { Layout } from 'components'
import styles from './index.less'
import Singleuser from './singleuser'
import Multiuser from './multiuser'

const { BaseLine, Nav } = Layout,
  RadioItem = Radio.RadioItem,
  PrefixCls = 'page-search-user'

function Searchuser ({ searchuser, loading, dispatch }) {
  const { textQuery, queryusers, selectedUsers, selectedUserValues, tragetState, selectedIndex, isSingle, tragetStateKey } = searchuser
  const validateTextQuery = (text) => {//验证搜索字符
    if (text) {
      const validate = /^[a-zA-Z]*$/.test(text)
      if (validate && text.length < 2) {
        return false
      } else {
        return true
      }
    }
  }
  const updateState = (payload) => {
      dispatch({
        type: 'searchuser/updateState',
        payload: {
          ...payload,
        },
      })
    },
    goBack = () => {
      if (isSingle) {
        handleOnSubmit()
      }
      dispatch(routerRedux.goBack())
    },
    onSubmit = () => {
      updateState({
        selectedIndex: 0,
      })
      if (textQuery) {
        validateTextQuery(textQuery)
          ?
          dispatch({
            type: 'searchuser/query',
            payload: {
              textQuery,
            },
          })
          :
          Toast.fail('请输入更多关键字', 3)
      } else {
        dispatch({
          type: 'searchuser/query',
          payload: {
            textQuery,
          },
        })
      }
    },
    handleOnSubmit = () => {
      if (tragetState) {
        const payload = {}
        if (tragetStateKey && tragetStateKey != '') {
          payload[tragetStateKey] = selectedUsers
        } else {
          payload['selectedUsers'] = selectedUsers
        }
        dispatch({
          type: `${tragetState}/updateUser`,
          payload,
        })
      }
      if (!isSingle) {
        goBack()
      }
    }

  const onChange = (value) => {
      updateState({
        textQuery: value,
      })
    },
    goCancel = () => {
      goBack()
    },
    onClear = () => {
      updateState({
        selectedIndex: 1,
      })
    },
    handleControlChange = (e) => {
      updateState({
        selectedIndex: e.nativeEvent.selectedSegmentIndex,
      })
    },
    handleItemClick = (data) => {
      const { value } = data,
        isDelete = selectedUserValues.includes(value),
        currentSelectedUsers = [],
        currentSelectedUserValues = []
      if (isSingle) {
        updateState({
          selectedUsers: [data],
          selectedUserValues: [value],
        })
        return
      }
      if (!isDelete) { //添加选择用户,已选择用户不存在这种情况
        updateState({
          selectedUsers: [...selectedUsers, data],
          selectedUserValues: [...selectedUserValues, value],
        })
        return
      }
      selectedUsers.map(_ => {
        if (_.value != value) {
          currentSelectedUsers.push(_)
        }
      })
      selectedUserValues.map(v => {
        if (v != value) {
          currentSelectedUserValues.push(v)
        }
      })
      updateState({
        selectedUsers: [...currentSelectedUsers],
        selectedUserValues: [...currentSelectedUserValues],
      })
    }

  const rightContent = []
  if (!isSingle) {
    rightContent.push(<Button
      onClick={handleOnSubmit}
      type="ghost"
      size="small"
      inline>
      保存
    </Button>)
  }

  const singleProps = {
      users: queryusers,
      selecteds: selectedUserValues,
      onSubmit: handleItemClick,
    },
    multiProps = {
      ...singleProps,
      selectedDatas: selectedUsers,
      selectedIndex,
      onChange: handleControlChange,
    }
  return (<div className={styles[`${PrefixCls}`]}>
    <div className={styles[`${PrefixCls}-header-box`]}>
      <div className={styles[`${PrefixCls}-header`]}>
        <NavBar
          mode="light"
          leftContent={'返回'}
          onLeftClick={goBack}
          rightContent={rightContent}>
          {'选择用户'}
        </NavBar>
        <div className={styles[`${PrefixCls}-searchbar-box`]}>
          <SearchBar
            value={textQuery}
            placeholder={'请输入用户名称或者登陆名'}
            onClear={onClear}
            onSubmit={onSubmit}
            showCancelButton={true}
            onChange={onChange}/>
          <div className={styles[`${PrefixCls}-searchbar-box-notice`]}>*请输入尽可能详细的关键字查询更多内容</div>
        </div>
      </div>
    </div>
    {isSingle ? <Singleuser {...singleProps}/> : <Multiuser {...multiProps}/>}
  </div>)
}

Searchuser.propTypes = {
  searchuser: PropTypes.object.isRequired,
  loading: PropTypes.object,
};

export default connect(({ searchuser, loading }) => ({
  searchuser,
  loading
}))(Searchuser);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { SearchBar, Button, WhiteSpace, WingBlank, SegmentedControl, List, Radio, NavBar } from 'antd-mobile';
import { Layout } from 'components'
import styles from './index.less'
const RadioItem = Radio.RadioItem;
const {BaseLine, Nav} = Layout;

function Searchuser({searchuser, loading, dispatch}) {
    const {textQuery, queryusers, selectedUsers, selectedUserValues, tragetState, selectedIndex} = searchuser,
        PrefixCls = "page-search";
    const updateState = (payload) => {
            dispatch({
                type: "searchuser/updateState",
                payload: {
                    ...payload
                }
            })
        },
        goBack = () => {
            dispatch(routerRedux.goBack());
        },
        onSubmit = () => {
            updateState({
                selectedIndex: 0
            });
            dispatch({
                type: "searchuser/query",
                payload: {
                    textQuery
                }
            })
        },
        handleOnSubmit = () => {
            if (tragetState) {
                dispatch({
                    type: `${tragetState}/updateState`,
                    payload: {
                        selectedUsers
                    }
                })
            }
            goBack();
        };

    const onChange = (value) => {
            updateState({
                textQuery: value
            });
        },
        goCancel = () => {
            goBack();
        },
        onClear = () => {
            updateState({
                selectedIndex: 1
            });
        },
        handleControlChange = (e) => {
            updateState({
                selectedIndex: e.nativeEvent.selectedSegmentIndex
            });
        },
        handleItemClick = (data) => {
            const {value} = data,
                isDelete = selectedUserValues.includes(value),
                currentSelectedUsers = [],
                currentSelectedUserValues = [];
            if (!isDelete) { //添加选择用户,已选择用户不存在这种情况
                updateState({
                    selectedUsers: [...selectedUsers, data],
                    selectedUserValues: [...selectedUserValues, value]
                })
                return;
            }
            selectedUsers.map(_ => {
                if (_.value != value)
                    currentSelectedUsers.push(_);
            });
            selectedUserValues.map(v => {
                if (v != value)
                    currentSelectedUserValues.push(_);
            })
            updateState({
                selectedUsers: [...currentSelectedUsers],
                selectedUserValues: [...currentSelectedUserValues]
            })
        };

    const layoutItems = () => {
            const datas = selectedIndex == 0 ? queryusers : selectedUsers;
            return (
                <List>
                  { datas && datas.map(data => layoutItem(data)) }
                </List>
            )
        },
        layoutItem = (data) => {
            switch (selectedIndex) {
            case 0: {
                const checked = selectedUserValues.includes(data.value);
                return (
                    <List.Item onClick={ handleItemClick.bind(null, data) }>
                      <RadioItem key={ data.value } checked={ checked }>
                        <span>{ data.text }</span>
                      </RadioItem>
                    </List.Item>
                )
            }
            case 1: {
                const checked = true;
                return (
                    <List.Item onClick={ handleItemClick.bind(null, data) }>
                      <RadioItem key={ data.value } checked={ checked }>
                        <span>{ data.text }</span>
                      </RadioItem>
                    </List.Item>
                )
            }
            }
    }
    const navProps = {
        title: "选择用户"
    }
    return (<div className={styles[`${PrefixCls}-searchuser`]}>
      <div className={styles[`${PrefixCls}-searchuser-header-box`]}>
      <div className={styles[`${PrefixCls}-searchuser-header`]}>
              <NavBar
                      mode="light"
                      leftContent={ "返回" }
                      onLeftClick={ goBack }
                      rightContent={ [<Button onClick={ handleOnSubmit } type="ghost" size="small" inline> 保存 </Button>] }>
                { "选择用户" }
              </NavBar>
        <div className={styles[`${PrefixCls}-searchbar-box`]}>
              <SearchBar
                         value={ textQuery }
                         placeholder={ "请输入用户名称或者登陆名" }
                         onClear={ onClear }
                         onSubmit={ onSubmit }
                         showCancelButton={true}
                         onChange={ onChange } />
        </div>

        <SegmentedControl
          selectedIndex={ selectedIndex }
          values={ ['搜索结果', '已选用户'] }
          onChange={ handleControlChange }
          style={ { padding: '.2rem' } } />
      </div>
      </div>
              <div className={styles[`${PrefixCls}-search-menu`]}>
                <WingBlank size="sm">
                  <div >
                  { layoutItems() }
                  </div>
                </WingBlank>
                <BaseLine/>
              </div>
            </div>);
}
Searchuser.propTypes = {
    searchuser: PropTypes.object.isRequired,
    loading: PropTypes.object,
};

export default connect(({searchuser, loading}) => ({
    searchuser,
    loading
}))(Searchuser);

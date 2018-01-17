import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Nav from 'components/Layout/nav'
import { List, Badge, Icon, Button, Accordion, Tag } from 'antd-mobile';
import { _bbsx, _case, _lore, _message } from 'utils/row'
import ListViews from 'components/listviews';

import styles from './index.less';
const Item = List.Item,
    PrefixCls = "mylist",
    fromModal = "mylist";

function Mylist({mylist, loading, dispatch}) {
    const {currentType, currentTitle, defalutHeight, resultProps} = mylist,
        {isLoading, hasMore, pagination, pageIndex} = resultProps;
    const update = (payload) => {
            dispatch({
                type: "mylist/updateResult",
                payload
            })
        },
        onRefresh = () => {
            dispatch({
                type: "mylist/resetResult",
                payload: {
                    refreshing: true
                }
            })
        },
        onEndReached = (event, st = 0) => {
            if (isLoading || !hasMore)
                return;
            const adds = {};
            if (!isNaN(st) && st > 0)
                adds[st] = pageIndex;
            update({
                isLoading: true,
                pagination: {
                    ...pagination,
                    ...adds
                }
            });
            dispatch({
                type: "mylist/query"
            })
        },
        updateScrollerTop = (scrollerTop) => {
            update({
                scrollerTop
            })
        },
        handleItemClick = (id) => {
            dispatch(routerRedux.push({
                pathname: "/details",
                query: {
                    moduleId: currentType,
                    id,
                    fromModal
                }
            }))
        },
        handleMyListClick = (updateId, id, moduleId) => {
            dispatch(routerRedux.push({
                pathname: "/details",
                query: {
                    moduleId,
                    id,
                    updateId,
                    fromModal
                }
            }))
        },
        handleTagClick = (id, selected) => {
            dispatch({
                type: "mylist/collect",
                payload: {
                    id,
                    value: selected ? 1 : 0
                }
            })
          dispatch({//取消收藏删除列
            type:'mylist/deleteItemById',
            payload: {
              itemId:id
            }
          })
        };

    const renderRow = (rowData, sectionID, rowID) => {
        switch (+currentType) {
        case 4:
            return _bbsx(rowData, sectionID, rowID, handleItemClick);
        case 1:
            return _case(rowData, sectionID, rowID, handleItemClick, handleTagClick);
        case 2:
            return _lore(rowData, sectionID, rowID, handleItemClick, handleTagClick);
        default:
            return _message(rowData, sectionID, rowID, handleMyListClick);
        }
    };

    const listviewsProps = {
        ...resultProps,
        onRefresh,
        onEndReached,
        renderRow,
        initialListSize: resultProps.dataSource.getRowCount() || 10,
        updateScrollerTop,
        defalutHeight,
    }
    return (
        <div>
          <Nav dispatch={dispatch} title={currentTitle}/>
          <div className={ styles[`${PrefixCls}-normal`] }>
            <ListViews {...listviewsProps}/>
          </div>
        </div>
        );
}

Mylist.propTypes = {
    mylist: PropTypes.object,
    loading: PropTypes.object,
};

export default connect(({mylist, loading}) => ({
    mylist,
    loading
}))(Mylist);



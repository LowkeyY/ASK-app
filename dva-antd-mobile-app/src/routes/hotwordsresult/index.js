import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Nav} from 'components/Layout';
import {List, Badge, Icon, Button, Accordion, Tag} from 'antd-mobile';
import ListViews from 'components/listviews';

const Item = List.Item;
const Brief = Item.Brief;

function HotWordsResult({hotwordsresult, dispatch}) {
  const {currentData, dataSource, hasMore, pageIndex, pagination, scrollerTop, totalCount, defalutHeight,isLoading} = hotwordsresult
  console.log(hotwordsresult)
  const renderRow = (rowData, sectionID, rowID) => {
     return <Item
        className={"row"}
        arrow="horizontal"
        multipleLine
        // onClick={ handleHotWordsClick.bind(null, rowData.id, rowData.moduleId) }
        key={`${sectionID} - ${rowID}`}
        wrap>
        <div className={"title"}>
          <h3>{rowData.title}</h3>
        </div>
        <Brief>
          {`${rowData.author} - (${rowData.date})`}
        </Brief>
      </Item>
    },
    update = (payload) => {
      dispatch({
        type: "updateData",
        payload
      })
    },
    onRefresh = () => {
      dispatch({
        type: "updateState",
        payload: {
          refreshing: true
        }
      })
    },
    updateScrollerTop = (scrollerTop) => {
      update({
        scrollerTop
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
        type: "hotwordsresult/query"
      })
    },
  listviewsProps = {
    dataSource,
    renderRow,
    scrollerTop,
    totalCount,
    pageIndex,
    pagination,
    defalutHeight,
    initialListSize: dataSource.getRowCount() || 10,
    onRefresh,
    onEndReached,
    updateScrollerTop,
    isLoading


  }
  return (
    <div>
      <Nav dispatch={dispatch}/>
      <ListViews {...listviewsProps}/>
    </div>
  )
}
export default connect(({hotwordsresult}) => ({
  hotwordsresult
}))(HotWordsResult);

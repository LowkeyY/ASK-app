import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, ListView, Badge, Icon, Button, Accordion, Tag } from 'antd-mobile';
import { getLocalIcon, getMockData } from 'utils'
import Results from './results';

const Item = List.Item,
    Brief = Item.Brief;

function Querylist({querylist, typequery, dispatch}) {

    const updateState = (payload) => {
        dispatch({
            type: "querylist/updateState",
            payload
        });
    }

    let PrefixCls = "query-list",
        {dataSource, isLoading, hasMore, pageIndex, scrollerTop} = querylist,
        {refreshing, filterSelected, primaryTag, preFilterSelected} = typequery;
    const currentKey = (+(preFilterSelected[primaryTag] || filterSelected[primaryTag]));
    const handleItemClick = (id, moduleId = currentKey) => {
            dispatch(routerRedux.push({
                pathname: "/details",
                query: {
                  moduleId
                }
            }))
        },
        onRefresh = () => {
            if (!refreshing) {
                dispatch({
                    type: 'typequery/updateState',
                    payload: {
                        refreshing: true
                    }
                });
            }
            dispatch({
                type: "querylist/resetState"
            });
        },
        onEndReached = (event) => {
            if (isLoading || !hasMore)
                return;
            updateState({
                isLoading: true
            });
            dispatch({
                type: "querylist/query",
                payload: {
                    ...filterSelected,
                    "start": pageIndex
                }
            });
        },
        updateScrollerTop = (scrollerTop) => {
            updateState({
                scrollerTop
            })
        },
        stopPropagation = (e) => {
            e.stopPropagation();
        },
        handleTagClick = () => {

        };

    const layoutBssList = (obj, sectionID, rowID) => (
            <Item
                  className={ "row" }
                  arrow="horizontal"
                  multipleLine
                  onClick={ handleItemClick.bind(null, obj.id) }
                  key={ `${sectionID} - ${rowID}` }
                  wrap>
              <div className={ "title" }>
                <h3>{ obj.title }</h3>
              </div>
              <Brief>
                { `${obj.author} - (${obj.date})` }
              </Brief>
              <div className={"content"}>
                <div>
                  <Icon type={getLocalIcon("/page/view.svg")} size="xs" />
                  <span>{`${obj.views || "0"}`}</span>
                </div>
                <div>
                  <Icon type="info-circle" size="xs" />
                  <span>{`${obj.replys || "0"}`}</span>
                </div>

                <div>
                  <Icon type={getLocalIcon("/page/板块.svg")} size="xs" />
                  <span>{`${obj.plates || "其它"}`}</span>
                </div>
                <div>
                  <Icon type={getLocalIcon("/page/状态.svg")} size="xs" />
                  <span>{`${obj.status || "其它"}`}</span>
                </div>
              </div>
            </Item>
        ),
        layoutCaseList = (obj, sectionID, rowID) => (
            <Item
                  className={ "row" }
                  arrow="horizontal"
                  multipleLine
                  onClick={ handleItemClick.bind(null, obj.id) }
                  key={ `${sectionID} - ${rowID}` }
                  wrap>
              <div className={ "title" }>
                <h3>{ obj.title }</h3>
              </div>
              <Brief>
                { `${obj.author} - (${obj.date})` }
              </Brief>
              <div className={ "content" }>
                <div>
                  <Icon type="info-circle" size="xs" /><span>{ obj.replys || 0 }</span>
                </div>
                <div>
                  <Icon type={ getLocalIcon("/page/view.svg") } size="xs" /><span>{ obj.views || 0 }</span>
                </div>
                <div onClick={ stopPropagation }>
                  <Tag onChange={ handleTagClick }>
                    <Icon type={ getLocalIcon("/page/collection.svg") } size="xs" />
                    <span>收藏案例</span>
                  </Tag>
                </div>
              </div>
            </Item>
        ),
        layoutEquipmentList = (obj, sectionID, rowID) => (
            <Item
                  className={ "row" }
                  arrow="horizontal"
                  multipleLine
                  onClick={ handleItemClick.bind(null, obj.id) }
                  key={ `${sectionID} - ${rowID}` }
                  wrap>
              <div className={ "title" }>
                { obj.title }
              </div>
              <Brief>
                { `${obj.author} - (${obj.date})` }
              </Brief>
              <div className={ "info" }>
                <p>
                  位置:<span>{ obj.fPath }</span>
                </p>
                <p>
                  大小:<span>{ obj.fSize }</span>
                </p>
              </div>
            </Item>
        ),
        layoutLoreList = (obj, sectionID, rowID) => (
            <Item
                  className={ "row" }
                  arrow="horizontal"
                  multipleLine
                  onClick={ handleItemClick.bind(null, obj.id) }
                  key={ `${sectionID} - ${rowID}` }
                  wrap>
              <div className={ "title" }>
                <h3>{ obj.title }</h3>
              </div>
              <Brief>
                { `${obj.author} - (${obj.date})` }
              </Brief>
              <div className={ "content" }>
                <div>
                  <Icon type="info-circle" size="xs" /><span>{ obj.replys || 0 }</span>
                </div>
                <div>
                  <Icon type={ getLocalIcon("/page/下载.svg") } size="xs" />
                  <span>{ obj.downloads || 0 }</span>
                </div>
                <div onClick={ stopPropagation }>
                  <Tag onChange={ handleTagClick }>
                    <Icon type={ getLocalIcon("/page/collection.svg") } size="xs" />
                    <span>收藏文档</span>
                  </Tag>
                </div>
              </div>
            </Item>
        ),
        layoutHotwordList = (obj, sectionID, rowID) => (
            <Item
                  className={ "row" }
                  arrow="horizontal"
                  multipleLine
                  onClick={ handleItemClick.bind(null, obj.id, obj.moduleId) }
                  key={ `${sectionID} - ${rowID}` }
                  wrap>
              <div className={ "title" }>
                <h3>{ obj.title }</h3>
              </div>
              <Brief>
                { `${obj.author} - (${obj.date})` }
              </Brief>
            </Item>
        ),
        layoutNotesList = (obj, sectionID, rowID) => (
            <Item
                  className={ "row" }
                  multipleLine
                  key={ `${sectionID} - ${rowID}` }
                  wrap>
              <div className={ "title" }>
                <h3>{ obj.title }</h3>
              </div>
              <Brief>
                { `${obj.author} - (${obj.date})` }
              </Brief>
            </Item>
        );

    const renderRow = (rowData, sectionID, rowID) => {
        switch (currentKey) {
        case 4:
          return layoutBssList(rowData, sectionID, rowID);
        case 1:
            return layoutCaseList(rowData, sectionID, rowID);
        case 2:
            return layoutLoreList(rowData, sectionID, rowID);
        case 3:
            return layoutEquipmentList(rowData, sectionID, rowID);
        case 5:
            return layoutHotwordList(rowData, sectionID, rowID);
        case 6:
            return layoutNotesList(rowData, sectionID, rowID);
        default:
            return <div style={ { display: "none" } }></div>;
        }
    };

    const resultsProps = {
        refreshing,
        dataSource,
        isLoading,
        onRefresh,
        onEndReached,
        renderRow,
        initialListSize: dataSource.getRowCount() || 10,
        scrollerTop,
        updateScrollerTop
    }

    return (
        <div className={ PrefixCls }>
          <Results {...resultsProps}/>
        </div>
    )
}

Querylist.propTypes = {
    querylist: PropTypes.object,
    typequery: PropTypes.object
};

export default connect(({querylist, typequery}) => ({
    querylist,
    typequery
}))(Querylist)


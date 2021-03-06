import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, ListView, Badge, Icon, Button, Accordion, Tag } from 'antd-mobile';
import { getLocalIcon, getMockData } from 'utils'
import Results from './results';

const Item = List.Item,
    Brief = Item.Brief;

function Querylist({querylist, typequery, dispatch,app}) {

    const updateState = (payload) => {
        dispatch({
            type: "querylist/updateState",
            payload
        });
    }

    let PrefixCls = "query-list",
        fromModal = "querylist",
        {dataSource, isLoading, hasMore, pageIndex, scrollerTop, pagination, totalCount} = querylist,
        {refreshing, filterSelected, primaryTag, preFilterSelected} = typequery,
        {defalutHeight}=app;
    const currentKey = (+(preFilterSelected[primaryTag] || filterSelected[primaryTag]));
    const handleItemClick = (id, currentKey) => {
            if (currentKey === 3) {
                dispatch(routerRedux.push({
                    pathname: "/pdfcontent",
                    query: {
                        moduleId: currentKey,
                        id
                    }
                }))
            } else {
                dispatch(routerRedux.push({
                    pathname: "/details",
                    query: {
                        moduleId: currentKey,
                        id,
                        fromModal
                    }
                }))
            }
        },
        handleHotWordsClick = (id, moduleId) => {
            if (moduleId === '3') {
                dispatch(routerRedux.push({
                    pathname: "/pdfcontent",
                    query: {
                        moduleId: moduleId,
                        id
                    }
                }))
            } else {
                dispatch(routerRedux.push({
                    pathname: "/details",
                    query: {
                        moduleId: moduleId,
                        id,
                        fromModal
                    }
                }))
            }

        },
        onRefresh = () => {
            dispatch({
                type: 'typequery/updateState',
                payload: {
                    refreshing: true
                }
            });
            dispatch({
                type: "querylist/resetState"
            });
        },
        onEndReached = (event, st = 0) => {
            if (isLoading || !hasMore || (st < 100 && pageIndex > 0))
                return;
            const adds = {};
            if (!isNaN(st) && st > 0 && pageIndex > 0)
                adds[st] = pageIndex;
            updateState({
                isLoading: true,
                pagination: {
                    ...pagination,
                    ...adds
                }
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
        handleTagClick = (isCollect, id) => {
            dispatch({
                type: 'querylist/collect',
                payload: {
                    value: isCollect ? 0 : 1,
                    id: id
                }
            })
        };

    const layoutBssList = (obj, sectionID, rowID) => (
            <Item
                  className={ "row" }
                  arrow="horizontal"
                  multipleLine
                  onClick={ handleItemClick.bind(null, obj.id, currentKey) }
                  key={ `${sectionID} - ${rowID}` }
                  wrap>
              <div className={ "title" } style={obj.isNew?{color:'#ff5b05'}:null}>
                <h3>{ obj.istop === '' ? '' : <Badge text="置顶" style={ {marginRight: 10, padding: '0 3px', backgroundColor: '#108ee9', borderRadius: 3 } } /> } { obj.title }</h3>
              </div>
              <Brief>
                { `${obj.author} - (${obj.date})` }
              </Brief>
              <div className={ "content" }>
                <div>
                  <Icon type={ getLocalIcon("/page/view.svg") } size="xs" />
                  <span>{ `${obj.views || "0"}` }</span>
                </div>
                <div>
                  <Icon type="info-circle" size="xs" />
                  <span>{ `${obj.replys || "0"}` }</span>
                </div>
                <div>
                  <Icon type={ getLocalIcon("/page/plate.svg") } size="xs" />
                  <span>{ `${obj.plates || "其它"}` }</span>
                </div>
                <div>
                  <Icon type={ getLocalIcon("/page/state.svg") } size="xs" />
                  <span>{ `${obj.status || "其它"}` }</span>
                </div>
              </div>
            </Item>
        ),
        layoutCaseList = (obj, sectionID, rowID) => (
            <Item
                  className={ "row" }
                  arrow="horizontal"
                  multipleLine
                  onClick={ handleItemClick.bind(null, obj.id, currentKey) }
                  key={ `${sectionID} - ${rowID}` }
                  wrap>
              <div className={ "title" } style={obj.isNew?{color:'#ff5b05'}:null}>
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
                  <Tag selected={ obj.isCollect } onChange={ handleTagClick.bind(null, obj.isCollect, obj.id) }>
                    <Icon type={ getLocalIcon("/page/collection.svg") } size="xs" />
                    { obj.isCollect
                      ?
                      <span className={ `${PrefixCls}-collection` }>已收藏</span>
                      : <span className={ `${PrefixCls}-collection` }>收藏案例</span> }
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
                  onClick={ handleItemClick.bind(null, obj.id, currentKey) }
                  key={ `${sectionID} - ${rowID}` }
                  wrap>
              <div className={ "title" }  style={obj.isNew?{color:'#ff5b05'}:null}>
                <h3>{ obj.title }</h3>
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
                  onClick={ handleItemClick.bind(null, obj.id, currentKey) }
                  key={ `${sectionID} - ${rowID}` }
                  wrap>
              <div className={ "title" } style={obj.isNew?{color:'#ff5b05'}:null}>
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
                  <Icon type={ getLocalIcon("/page/download.svg") } size="xs" />
                  <span>{ obj.downloads || 0 }</span>
                </div>
                <div onClick={ stopPropagation }>
                  <Tag selected={ obj.isCollect } onChange={ handleTagClick.bind(null, obj.isCollect, obj.id) }>
                    <Icon type={ getLocalIcon("/page/collection.svg") } size="xs" />
                    { obj.isCollect
                      ?
                      <span className={ `${PrefixCls}-collection` }>已收藏</span>
                      : <span className={ `${PrefixCls}-collection` }>收藏文档</span> }
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
                  onClick={ handleHotWordsClick.bind(null, obj.id, obj.moduleId) }
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
            <Item className={ "row" } multipleLine key={ `${sectionID} - ${rowID}` } wrap>
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
        defalutHeight,
        initialListSize: dataSource.getRowCount() || 10,
        scrollerTop,
        updateScrollerTop,
        pagination,
        totalCount,
        pageIndex
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

export default connect(({querylist, typequery,app}) => ({
    querylist,
    typequery,
    app
}))(Querylist)

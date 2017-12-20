import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, ListView, Badge, Icon, Button, Accordion, Tag } from 'antd-mobile';
import { getLocalIcon, getMockData } from 'utils'
import Listviews from 'components/listviews';
import styles from './index.less'

const Item = List.Item,
    Brief = Item.Brief;

function Results(results) {
    const {textQuery, currentModuleId, currentFilter, resultProps, onSubmit, goBack, goPage, goFilter, update, resetResult} = results,
        {refreshing, dataSource, isLoading, hasMore, pageIndex, scrollerTop} = resultProps;
    const currentKey = (+currentModuleId);
    const onRefresh = () => {
            resetResult({
                refreshing: true
            });
        },
        onEndReached = (event) => {
            if (isLoading || !hasMore)
                return;
            update({
                isLoading: true
            });
            onSubmit(pageIndex);
        },
        updateScrollerTop = (scrollerTop) => {
            update({
                scrollerTop
            })
        },
        stopPropagation = (e) => {
            e.stopPropagation();
        },
        handleTagClick = () => {

        },
        handleItemClick = (id) => {
            goPage({
                id
            });
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
                  <Icon type={ getLocalIcon("/page/download.svg") } size="xs" />
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

    const listviewsProps = {
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
        <div>
          <div className={ styles["header-search"] }>
            <div className={ styles["center"] }>
              <div className={ styles["goback-btn"] } onClick={ goBack }>
                <Icon type={ getLocalIcon("/page/goback.svg") } size="sm" />
              </div>
              <Button
                      className={ "header-search-btn" }
                      inline
                      size="small"
                      icon="search"
                      onClick={ goFilter }>
                { textQuery }
              </Button>
            </div>
          </div>
          <Listviews {...listviewsProps}/>
        </div>
    )
}

Results.propTypes = {
};

export default (Results);

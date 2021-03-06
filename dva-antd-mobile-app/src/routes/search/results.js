import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, ListView, Badge, Icon, Button, Accordion, Tag } from 'antd-mobile';
import { getLocalIcon } from 'utils'
import { _bbsx, _case, _lore, _equipment, _hotword, _note } from 'utils/row'
import Listviews from 'components/listviews';
import styles from './index.less'

const Item = List.Item,
    Brief = Item.Brief;

function Results(results) {
    const {textQuery, currentModuleId, currentFilter, resultProps, onSubmit, goBack, collect, goPage, goPdf, goHotWords, goFilter, update, resetResult, defalutHeight} = results,
        {refreshing, dataSource, isLoading, hasMore, pageIndex, scrollerTop, totalCount, pagination} = resultProps;
    const currentKey = (+currentModuleId);
    const onRefresh = () => {
            resetResult({
                refreshing: true
            });
        },
        onEndReached = (event, st = 0) => {
            if ((isLoading || !hasMore) && !refreshing)
                return;
            const adds = {};
            if (!isNaN(st) && st > 0)
                adds[st] = pageIndex;
            update({
                isLoading: true,
                pagination: {
                    ...resultProps.pagination,
                    ...adds
                }
            });
            onSubmit(pageIndex);
        },
        updateScrollerTop = (scrollerTop) => {
            update({
                scrollerTop
            })
        };
    const renderRow = (rowData, sectionID, rowID) => {
        switch (currentKey) {
        case 4:
            return _bbsx(rowData, sectionID, rowID, goPage);
        case 1:
            return _case(rowData, sectionID, rowID, goPage, collect);
        case 2:
            return _lore(rowData, sectionID, rowID, goPage, collect);
        case 3:
            return _equipment(rowData, sectionID, rowID, goPdf);
        case 5:
            return _hotword(rowData, sectionID, rowID, goHotWords);
        case 6:
            return _note(rowData, sectionID, rowID);
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
        updateScrollerTop,
        defalutHeight,
        pageIndex,
        totalCount,
        pagination
    }

    return (
        <div>
          <div className={ styles["header-search-box"] }>
            <div className={ styles["header-search"] }>
              <div className={ styles["center"] }>
                <div className={ styles["goback-btn"] } onClick={ goBack }>
                  <Icon type={ getLocalIcon("/page/goback.svg") } size="sm" />
                </div>
                <Button className={ "header-search-btn result-list" }
                  size="small"
                  icon="search"
                  onClick={ goFilter }>
                  { textQuery }
                </Button>
              </div>
            </div>
          </div>
          <Listviews {...listviewsProps}/>
        </div>
    )
}

Results.propTypes = {
};

export default (Results);

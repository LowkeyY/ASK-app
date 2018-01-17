import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Nav } from 'components/Layout';
import { List, Badge, Icon, Button, Accordion, Tag } from 'antd-mobile';
import { _hotword} from 'utils/row'
import ListViews from 'components/listviews';

function HotWordsResult({hotwordsresult, loading, dispatch}) {
 const {currentData,dataSource,hasMore,isLoading,pageIndex,pagination,scrollerTop,totalCount}=hotwordsresult
  const renderRow = (rowData, sectionID, rowID) => {
        return _hotword(rowData, sectionID, rowID);
  };
const listviewsProps={
  dataSource,
  isLoading,
  renderRow,
  scrollerTop,
  totalCount,
  pageIndex,
  pagination
}
   return(
     <div>
       <Nav dispatch={dispatch} />
       <ListViews {...listviewsProps}/>
     </div>
   )
}
export default connect(({hotwordsresult, loading}) => ({
  hotwordsresult,
  loading
}))(HotWordsResult);

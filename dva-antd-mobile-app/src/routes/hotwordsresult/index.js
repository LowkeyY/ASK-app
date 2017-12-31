import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Nav } from 'components/Layout';
import { List, Badge, Icon, Button, Accordion, Tag } from 'antd-mobile';
import { __hotword} from 'utils/row'
import ListViews from 'components/listviews';

function HotWordsResult({hotwordsresult, loading, dispatch}) {

  const renderRow = (rowData, sectionID, rowID) => {
        return __hotword(rowData, sectionID, rowID, handleHotWordsClick);
    }

const listviewsProps={
  renderRow
}
   return(
     <div>
       <Nav dispatch={dispatch}/>
       {/*<ListViews {...listviewsProps}/>*/}
     </div>
   )
}
export default connect(({hotwordsresult, loading}) => ({
  hotwordsresult,
  loading
}))(HotWordsResult);

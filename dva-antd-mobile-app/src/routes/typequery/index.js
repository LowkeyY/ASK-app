import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import DemoDrawer from '../test/Drawer';

function Typequery({
  location , typequery , loading , dispatch
}) {
  	const  PrefixCls = "typequery" , {query : {froms = "/"}} = location;
    const {selectSys} = typequery;
    const demoDrawerProps ={
      dispatch,
      froms : "/typequery",
      selectSys
    }
    return (
      <DemoDrawer {...demoDrawerProps}/>
    )
}

Typequery.propTypes = {
	test: PropTypes.object,
	loading: PropTypes.object,
};
export default connect(({ typequery, loading }) => ({ typequery, loading }))(Typequery)

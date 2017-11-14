import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';

function Search({
  location , Search , loading , dispatch 
}) {

  	let { pathname , query:{froms}} = location
  	pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  
	const goBack = ()=> {
	    dispatch(routerRedux.push(froms || "/"))
	}

	const goCancel = () =>{
		console.log("11111111111111");
	}



	return (
	    <div>
	    	<WingBlank />
	    		<SearchBar placeholder={"请输入搜索内容"} focused onClear = {goCancel} onCancel={goBack}/>
	    	<WhiteSpace />
	    </div>
	);
}

Search.propTypes = {
  location: PropTypes.object.isRequired,
  page03: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ Search, loading }) => ({ Search, loading }))(Search);



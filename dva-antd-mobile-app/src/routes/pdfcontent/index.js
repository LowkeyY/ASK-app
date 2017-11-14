import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar , SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { Document , Page} from 'react-pdf/build/entry.webpack'
import styles from './index.less'
import pdffile from './1.pdf'


function pdfcontent({
  location , pdfcontent , loading , dispatch 
}) {
	
  	let {fileUrl = "http://projekty.wojtekmaj.pl/react-pdf/sample.pdf" , pdfProps = {} , numPages} = pdfcontent;
  
	const goBack = ()=> {
	    dispatch(routerRedux.goBack())
	} , loadSuccess = (pdf)=>{
		dispatch({type :"pdfcontent/updateState" , payload:{numPages : pdf.numPages}});
		console.log("loadSuccess" , arguments);
	}

	const PrefixCls = "pdfcontent"; 

	const finalProps = {
		...pdfProps,
		onLoadSuccess : loadSuccess,
		onParseError : (e)=> {console.log("onParseError",e)},
		onParseSuccess : ()=> {console.log("onParseSuccess",e)} 
	}
	let index = 0;

	return (
		<div>
			<div className={styles[`${PrefixCls}-header`]}>
		    <NavBar leftContent="返回"
		      mode="light"
		      onLeftClick={goBack}
		    ></NavBar>
		    </div>
		    <div className={styles[`${PrefixCls}-normal`]}>
				<WingBlank size="sm">
				<Document file={pdffile} {...finalProps}>
					{
	                Array.from(
	                  new Array(numPages),
	                  (el, index) => (
	                    <Page
	                      key={`page_${index + 1}`}
	                      pageNumber={index + 1}
	                      width={Math.min(600, document.body.clientWidth - 10)}
	                    />
	                  ),
	                )
	              }
				</Document>
				</WingBlank>
			</div>
		</div>
	);
}

pdfcontent.propTypes = {
  location: PropTypes.object.isRequired,
  testcontent: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ pdfcontent, loading }) => ({ pdfcontent, loading }))(pdfcontent);



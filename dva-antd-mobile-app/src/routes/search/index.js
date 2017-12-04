import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { SearchBar, Button, WhiteSpace, WingBlank , Flex , Radio , Picker , List} from 'antd-mobile';
import {searchStyles} from './index.less';
const RadioItem = Radio.RadioItem;

function Search({
  location , Search , loading , dispatch 
}) {

	const PrefixCls = "page-search";

	const goBack = ()=> {
	    dispatch(routerRedux.goBack());
	} , goCancel = () =>{
		console.log("goCancel");
	} , handleFlexItemClick = (key) => {
		console.log("handleFlexItemClick" , key);
	}

	const queryValues = 1 ,packQueryparams = (datas) => {
		return (
			<Flex>
				{datas && datas.map((i ,index) => {
					return (
						<Flex.Item onClick = {() => {handleFlexItemClick(i.value)}}>
							<RadioItem key={i.value} checked={queryValues === i.value}>
								<span>{i.text}</span>
							</RadioItem>
						</Flex.Item>
					)
				})}
			</Flex>
		)
	}

	const queryTypes = [
		{ text : '交流论坛', value : 1} ,
		{ text : '经验案例', value : 2} ,
		{ text : '设备资料', value : 3} ,
		{ text : '知识文库', value : 4} ,
		{ text : '热词', value : 5} ,
		{ text : '通知公告', value : 6} 
	];

	let datas = [];

	return (
	    <div>
	    	<WingBlank />
	    	<SearchBar placeholder={"请输入搜索内容"} focused onClear = {goCancel} onCancel={goBack}/>
	    	<div className={`${PrefixCls}`}>
	    		
				{
					queryTypes && queryTypes.map((i ,index) => {
						datas.push(i);
						if(datas.length === 3){
							const newDatas = datas.concat();
							datas.length = 0;
							return packQueryparams(newDatas);
						} else if(index === queryTypes.length - 1){
							return packQueryparams(datas);
						}
					})
				}
			</div>
			<WhiteSpace />
			<div className={`${PrefixCls}-terms`}>
				<List>
					<Picker data={""} cols={1} extra="请选择发帖人(全部)">
		            	<List.Item arrow="horizontal">发帖人</List.Item>
		           	</Picker>
	           	</List>
	           	<List>
		           	<Picker data={""} cols={1} extra="请选择板块(全部)">
		            	<List.Item arrow="horizontal">板块</List.Item>
		           	</Picker>
	           	</List>
	        </div>
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



import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { NavBar, Icon , WingBlank , WhiteSpace , List , Radio , Flex , Button} from 'antd-mobile';
import styles from './index.less';
import Demo from '../test/components';
import { Layout } from 'components'

const RadioItem = Radio.RadioItem;
const {Header} = Layout , PrefixCls = "page01";

function Page01({
	dispatch , location , page01 , loading
}) {
	const {leftContentValue = {text : "经验案例" , value : 1} , queryValues } = page01;

	const queryTypes = [
		{ text : '秒速五厘米', value : 0} ,
		{ text : '灌篮高手', value : 1} ,
		{ text : '七龙珠', value : 2} ,
		{ text : '海贼王', value : 3} ,
		{ text : '天空之城', value : 4} ,
		{ text : '萤火之森', value : 5} ,
		{ text : '你的名字', value : 6} ,
		{ text : '千与千寻', value : 7},
	], leftContent = "";

	const handleFlexItemClick = (value)=> {
		dispatch({type :"page01/updateState" , payload:{queryValues : value}});
	}

	const packQueryType = (datas) => {
		return (
			<Flex>
				{datas && datas.map((i ,index) => {
					return (
						<Flex.Item onClick = {() => {handleFlexItemClick(i.value)}}>
							<RadioItem  className={styles[`${PrefixCls}-flexitem`]} key={i.value} checked={queryValues === i.value}>
								<span>{i.text}</span>
							</RadioItem>
						</Flex.Item>
					)
				})}
			</Flex>
		)
	}

	const headerProps = {
		froms : '/page01',
		leftContent : {a : 1},
      	dispatch ,
      	rightContent : {icon : "/header/add.svg" , to : "/creates"},
  	}
  	const demoProps = {
  		froms : '/page01',
  		dispatch,
  	}
	let datas = [];
	return (
		<div>
		  	<Header {...headerProps}/>
		    <div className={styles[`${PrefixCls}-normal`]}>
		    	<WhiteSpace size="sm" />
					{
						queryTypes && queryTypes.map((i ,index) => {
							datas.push(i);
							if(datas.length === 3){
								const newDatas = datas.concat();
								datas.length = 0;
								return packQueryType(newDatas);
							} else if(index === queryTypes.length - 1){
								return packQueryType(datas);
							}
						})
					}
				<WhiteSpace size="sm" />
		      	<Demo {...demoProps}/>
		    </div>
		</div>
  );
}

Page01.propTypes = {
	location: PropTypes.object.isRequired,
	page01: PropTypes.object,
	loading: PropTypes.object,
};

export default connect(({ page01, loading }) => ({ page01, loading }))(Page01);

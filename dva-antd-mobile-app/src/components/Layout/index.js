import Header from './header';
import Headersearch from './header-search';
import Headertitle from './headertitle';
import { NoticeBar , List ,Tag,NavBar} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import markImage from 'themes/images/watermark.png';
import './index.less';

const PrefixCls = "page-content";

module.exports = {
	Header,
	Headersearch,
	Headertitle,
	BaseLine : () => (
		<div className={`${PrefixCls}-baseline`}>
			<p>
				没有更多内容了
			</p>
		</div>
	),
	Filterview : ({values = []}) => {
		const Cls = "list-filter" , maxWordLength = 8;
		let index = 1;
		return(
			<List className = {Cls}>
				<List.Item wrap>
	        		{values.map(_ => <Tag key={`filter-tag-${index++}`}>{_.length >= maxWordLength ? _.substr(0 , maxWordLength - 1) + ".." : _}</Tag>)}
	        	</List.Item>
	    	</List>
		)
	},
	Warnings : (
		{warnWords = "此文件仅作为公司内部使用，使用人应承担保密义务，如因违反规定而造成公司保密文件外泄情况发生,使用人应承担一切损失与后果。"}
	)=>(
			<List className={`${PrefixCls}-warnings`}>
				<List.Item>
					<NoticeBar marqueeProps={{ loop: true, style: {color:'red',background:'#fff'}}}>
						{warnWords}
					</NoticeBar>
				</List.Item>
			</List>
	),
	WaterMark : () => (
			<div className={`${PrefixCls}-watermark`}>
				<img src={markImage}/>
			</div>
	),
  Nav:(props)=>{

    const goBack =()=>{
      console.log(props)
      props.dispatch(routerRedux.goBack())
    }
    return(
      <div style={{height:'45px'}}>
        <div className={`${PrefixCls}-nav`}>
          <NavBar
            mode="light"
            leftContent="返回"
            onLeftClick={goBack}
          >
            <p className={`${PrefixCls}-nav-title`}>{props.title}</p>
          </NavBar>
        </div>
      </div>
      )
  }

};

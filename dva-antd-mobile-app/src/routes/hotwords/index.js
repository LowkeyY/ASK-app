import React from 'react';
import {Icon} from 'antd-mobile';
import { connect } from 'dva';
import Hottag from './component/hottag'
import styles from './index.less'
import {getLocalIcon} from 'utils'
const PrefixCls = 'hotwords';
class HotWords extends React.Component {
  constructor() {
    super();
    this.state = {
      enter: true,

    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  toggleDropdown(){
    this.setState({enter: !this.state.enter,
    });
  }

  render() {
    const hotwords = this.props.hotwords,
      icon= '/page/' + (this.state.enter ? 'up.svg':'down.svg'),
      realHeight= this.state.enter? {height:'80px'}:{height:'100%'},
      {height}=realHeight,
      display=(height==='80px')?"none":"block";

    return (

      <div className={styles[`${PrefixCls}-container`]}>
        <div className={styles[`${PrefixCls}-container-head`]} style={realHeight}>
          <span className={styles[`${PrefixCls}-container-head-logo`]}>热词</span>
          {
            hotwords.map(_ => <Hottag title={_.text}/>)
          }
          <div
            onClick={this.toggleDropdown}
            className={styles[`${PrefixCls}-dropdownBtn`]}><Icon type={getLocalIcon(icon)} size="xs" /></div>
        </div>
      </div>
    );
  }
}
export default connect(({ HotWords, loading }) => ({ HotWords, loading }))(HotWords);

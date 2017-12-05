import React from 'react';
import { connect } from 'dva';
import styles from '../index.less'
const PrefixCls='hotwords';

class Hottag extends React.Component{
  render() {
    return (
        <div key={this.props.key} style={{display:"inline-block"}}>
          <a className={styles[`${PrefixCls}-hot-tag`]}>{this.props.title}</a>
        </div>
    );
  }
}
export default Hottag

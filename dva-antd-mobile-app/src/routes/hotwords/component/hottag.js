import React from 'react';
import { connect } from 'dva';
import styles from '../index.less'
const PrefixCls='hotwords';

class Hottag extends React.Component{

  render() {
    return (
        <div style={{display:"inline-block", margin:'0 8px 0 0'}}>
          <a className={styles[`${PrefixCls}-hot-tag`]}>{this.props.title}</a>
        </div>
    );
  }
}


export default Hottag

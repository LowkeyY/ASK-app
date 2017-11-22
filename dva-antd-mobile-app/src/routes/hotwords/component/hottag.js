import React from 'react';
import { connect } from 'dva';
import styles from '../index.less'
const PrefixCls='hotwords';

class Hottag extends React.Component{

  render() {
    return (
        <div style={{display:"inline-block"}}>
          <a className={styles[`${PrefixCls}-hot-tag`]}>海贼王</a>
        </div>
    );
  }
}


export default Hottag

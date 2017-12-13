
import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from '../index.less'
const PrefixCls='hotwords';

class Hottag extends React.Component{
  render() {

    const handleItemClick = () => {
      this.props.dispatch({
        type: "typequery/updateState",
        payload: {
          refreshing: true
        }
      });
    }
    return (
      <div key={this.props.id} style={{display:"inline-block"}} onClick={ handleItemClick.bind(null) }>
        <Link className={styles[`${PrefixCls}-hot-tag`]} to={ `/typequery?moduleId=5&lists=${this.props.id}` }>
          {this.props.title}
        </Link>
      </div>
    );
  }
}
export default Hottag

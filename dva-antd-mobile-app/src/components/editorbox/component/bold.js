import React from 'react'
import {Icon} from 'antd-mobile'
import {getLocalIcon} from 'utils'
import styles from '../index.less'
const Css = 'editorbox';
class Bold extends React.Component{
  render(){
    return(
      <div
    onTouchStart={this.ActiveBold}
    className={styles[`${Css}-box-item`]}>
    <Icon type={getLocalIcon('/editor/加粗.svg')}/>
    </div>
    )
  }
}
export default Bold

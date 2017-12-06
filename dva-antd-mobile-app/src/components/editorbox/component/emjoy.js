import React from 'react'
import {Icon} from 'antd-mobile'
import {getLocalIcon} from 'utils'
import styles from '../index.less'
const Css = 'editorbox';
class Emjoy extends React.Component{
  render(){
    return(
      <div
        onTouchStart={this.activeCenter}
        className={styles[`${Css}-box-item`]}>
        <Icon type={getLocalIcon('/editor/表情.svg')}/>
      </div>
    )
  }
}
export default Emjoy

import React from 'react'
import {Icon} from 'antd-mobile'
import {getLocalIcon} from 'utils'
import styles from '../index.less'
const Css = 'editorbox';
class Camera extends React.Component{
  render(){
    return(
      <div
        onTouchStart={this.activeCenter}
        className={styles[`${Css}-box-item`]}>
        <Icon type={getLocalIcon('/editor/相机.svg')}/>
      </div>
    )
  }
}
export default Camera

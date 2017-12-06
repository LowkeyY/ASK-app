import React from 'react'
import {Icon} from 'antd-mobile'
import {getLocalIcon} from 'utils'
import styles from '../index.less'
const Css = 'editorbox';
class Photo extends React.Component{
  constructor(){
    super()
  }

  render (){
    return(
      <div

        onTouchStart={this.activeCenter}
        className={styles[`${Css}-box-item`]}>
        <Icon type={getLocalIcon('/editor/上传图片.svg')}/>
      </div>
    )
  }
}
export default Photo

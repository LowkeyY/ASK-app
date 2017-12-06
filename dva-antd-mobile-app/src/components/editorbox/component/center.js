import React from 'react'
import {Icon} from 'antd-mobile'
import {getLocalIcon} from 'utils'
import styles from '../index.less'
const Css = 'editorbox';
class TextCenter extends React.Component{

  render(){
    return(
      <div

        className={styles[`${Css}-box-item`]}>
        <Icon type={getLocalIcon('/editor/居中.svg')}/>
    </div>
    )
  }
}
export default TextCenter

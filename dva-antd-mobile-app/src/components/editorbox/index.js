import React from 'react'
import styles from './index.less'
import {Icon} from 'antd-mobile'
import {getLocalIcon} from 'utils'
const Css = 'editorbox';
function EditorBox() {
  return(
    <div className={styles[`${Css}-box`]}>
      <div className={styles[`${Css}-box-item`]}>
        <Icon type={getLocalIcon('/editor/加粗.svg')}/>
      </div>
      <div className={styles[`${Css}-box-item`]}>
        <Icon type={getLocalIcon('/editor/斜体.svg')}/>
      </div>
      <div className={styles[`${Css}-box-item`]}>
        <Icon type={getLocalIcon('/editor/居中.svg')}/>
      </div>
      <div className={styles[`${Css}-box-item`]}>
        <Icon type={getLocalIcon('/editor/两端对齐.svg')}/>
      </div>
      <div className={styles[`${Css}-box-item`]}>
        <Icon type={getLocalIcon('/editor/表情.svg')}/>
      </div>
      <div className={styles[`${Css}-box-item`]}>
        <Icon type={getLocalIcon('/editor/上传图片.svg')}/>
      </div>

    </div>
  )
}
export default EditorBox

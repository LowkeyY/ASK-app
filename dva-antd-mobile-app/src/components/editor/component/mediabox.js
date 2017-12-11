import React from 'react';
import {Icon} from 'antd-mobile';
import {getLocalIcon} from 'utils'
import styles from '../index.less'



const MediaControls=()=>{

  return (
    <div className={styles['RichEditor-controls']}>
      <span className={styles['RichEditor-controls-item']}><Icon type={getLocalIcon('/editor/上传图片.svg')}/></span>
      <span className={styles['RichEditor-controls-item']}><Icon type={getLocalIcon('/editor/相机.svg')}/></span>
      <span className={styles['RichEditor-controls-item']}><Icon type={getLocalIcon('/editor/表情.svg')}/></span>
    </div>
  )
}
export default MediaControls

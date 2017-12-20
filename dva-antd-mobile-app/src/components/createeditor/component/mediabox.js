import React from 'react';
import {Icon} from 'antd-mobile';
import {getLocalIcon} from 'utils'
import styles from '../index.less'


const MediaControls=()=>{
  return (
    <div className={styles['RichEditor-controls']}>
      <span className={styles['RichEditor-controls-img-box']}><input type="file" accept="image" multiple=""/><Icon type={getLocalIcon('/editor/sendimg.svg')} size="xxs"/></span>
      <span className={styles['RichEditor-controls-camera-box']}><input type="file" accept="image/*" capture='camera' multiple=""/> <Icon type={getLocalIcon('/editor/camera.svg')} size="xxs"/></span>
      <span className={styles['RichEditor-controls-item']}><Icon type={getLocalIcon('/editor/emjoy.svg')} size="xxs"/></span>
    </div>
  )
}
export default MediaControls

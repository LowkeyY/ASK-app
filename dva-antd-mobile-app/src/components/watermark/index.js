import React from 'react'
import styles from './index.less'
import image from './watermark.png'
const PrefixCls='watermark';
export default class WaterMark extends React.Component{
  render(){
    return(
      <div className={styles[`${PrefixCls}-water-mark`]}>
        <img className={styles[`${PrefixCls}-water-mark-img`]} src={image} alt=""/>
      </div>
    )
  }
}

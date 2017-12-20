import React from 'react';
import {Slider, List } from 'antd-mobile';
import styles from './slider.less';
const Item = List.Item,PrefixCls='fontsize';
class FontSlider extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    // const defaultValue = this.props.fontSize==="large" ? 100: this.props.fontSize==="small" ? 0 : 50;
    let defaultValue;
    switch ( this.props.fontSize){
      case 'min': defaultValue=0; break
      case 'small': defaultValue=25; break
      case 'normal': defaultValue=50; break
      case 'large': defaultValue=75; break
      case 'max': defaultValue=100; break
    }


    return(
      <div className={styles[`${PrefixCls}-silder-box`]}>
        <p className={styles[`${PrefixCls}-font-small`]}>小</p>
        <p className={styles[`${PrefixCls}-font-big`]}>大</p>
      <List>
        <Item>
          <div className={styles[`${PrefixCls}-scale-box`]}>
            <div className={styles[`${PrefixCls}-scale`]}>
              <div className={styles[`${PrefixCls}-scale-1`]}></div>
              <div className={styles[`${PrefixCls}-scale-2`]}></div>
              <div className={styles[`${PrefixCls}-scale-3`]}></div>
              <div className={styles[`${PrefixCls}-scale-4`]}></div>
              <div className={styles[`${PrefixCls}-scale-5`]}></div>
            </div>
          </div>
        <Slider
          style={{ marginLeft: 30, marginRight: 30 }}
          defaultValue={defaultValue}
          min={0}
          max={100}
          step={25}
          handleStyle={{background:'#108ee9',zIndex:'3'}}
          trackStyle={{background:'#888'}}
          onChange={this.props.controlSize}
        />
        </Item>
      </List>
      </div>
    )
  }
}
export default FontSlider

import React from 'react';
import {Slider, List } from 'antd-mobile';
import styles from './slider.less';
const Item = List.Item,PrefixCls='fontsize';
class FontSlider extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className={styles[`${PrefixCls}-silder-box`]}>
        <p className={styles[`${PrefixCls}-font-small`]}>小</p>
        <p className={styles[`${PrefixCls}-font-big`]}>大</p>
      <List>
        <Item>
        <Slider
          style={{ marginLeft: 30, marginRight: 30 }}
          defaultValue={50}
          min={0}
          max={100}
          step={50}
          onChange={this.props.controlSize}
        />
        </Item>
      </List>
      </div>
    )
  }
}
export default FontSlider
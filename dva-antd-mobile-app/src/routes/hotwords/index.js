import React from 'react';
import {Badge,Icon} from 'antd-mobile';
import { connect } from 'dva';
import Hottag from './component/hottag'
import styles from './index.less'
import {getLocalIcon} from 'utils'
import Animate from 'rc-animate';
const data = [
  {
    id:1,
    word:"秒速五厘米"
  },
  {
    id:2,
    word:"灌篮高手"
  },
  {
    id:3,
    word:"七龙珠"
  },
  {
    id:4,
    word:"海贼王"
  },
  {
    id:5,
    word:"天空之城"
  },
  {
    id:6,
    word:"萤火之森"
  },
  {
    id:7,
    word:"你的名字"
  },
  {
    id:8,
    word:"千与千寻"
  },
  {
    id:9,
    word:"我们仍未知道那天所见花的名字"
  },
  {
    id:10,
    word:"银魂"
  },
];
const PrefixCls = 'hotwords';
class HotWords extends React.Component {
  constructor() {
    super();
    this.state = {
      enter: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  toggleDropdown(){
    this.setState({enter: !this.state.enter});
  }
  render() {
    const icon=this.state.enter?'/dropup.svg':'/dropdown.svg',
      enter=this.state.enter?'none':'block',
      style={
        display: this.state.enter ? 'block' : 'none',
      };
    return (
      <div className={styles[`${PrefixCls}-container`]}>
        <div className={styles[`${PrefixCls}-container-head`]}>
        <Badge text="热词"  />
        <Hottag/>
        <Hottag/>
        <Hottag/>
        <Hottag/>
        <Hottag/>
        <Hottag/>
        <Hottag/>
        <Hottag/>
        <Hottag/>
        <Hottag/>
        <div
          onClick={this.toggleDropdown}
          className={styles[`${PrefixCls}-dropdownBtn`]}><Icon type={getLocalIcon(icon)} size="xs" /></div>
        </div>
        <Animate
          transitionName="fade"
          component=""
        >
          {this.state.enter ?
            <div key="1" className={styles[`${PrefixCls}-hotwrodsBox`]}
            >
              {

                data.map((item, index) => {
                  return (

                      <a key={item.id} className={styles[`${PrefixCls}-hot-tag`]}>{item.word}</a>

                  );
                })
              }
            </div>
            :
            null
          }
        </Animate>

      </div>
    );
  }
}
export default connect(({ HotWords, loading }) => ({ HotWords, loading }))(HotWords);

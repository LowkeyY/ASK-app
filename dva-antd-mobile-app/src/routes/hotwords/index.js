import React from 'react';
import { Accordion ,Badge} from 'antd-mobile';
import { connect } from 'dva';
import Hottag from './component/hottag'
import styles from './index.less'
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
]
class HotWords extends React.Component {

  onChange = (key) => {
    console.log(key);
  }
  render() {
    return (
      <div >
        <Accordion  className="my-accordion" onChange={this.onChange} accordion ={false}>
          <Accordion.Panel header={[ <Badge text="热词" hot style={{ marginLeft: 12 }} />,<Hottag />,<Hottag />,<Hottag />,<Hottag />]} className="pad">
            {
              data.map((item,index)=>{
                return (
                  <div style={{display:"inline-block"}} key={item.id}>
                    <a className={styles['hot-tag']}>{item.word}</a>
                  </div>
                );
              })
            }

          </Accordion.Panel>
        </Accordion>

      </div>
    );
  }
}
export default connect(({ HotWords, loading }) => ({ HotWords, loading }))(HotWords);

import React from 'react'
import { getLocalIcon} from 'utils'
import { Badge ,Icon , Tag} from 'antd-mobile';
import styles from './index.less'
const PrefixCls='discussFoot';
const DiscussFoot =(props)=>{
  return(
    <div className={styles[`${PrefixCls}-box`]}>
      <div className={styles[`${PrefixCls}-box-btns-integral`]}>
        <Icon type={getLocalIcon("/page/积分.svg")} size="xs"/>
        <span className={styles[`${PrefixCls}-box-btns-integral-count`]}>积分：{props.integral || 0}</span>
      </div>
      <div className={styles[`${PrefixCls}-box-btns`]}>
       <div className={styles[`${PrefixCls}-box-btns-collection`]}>
         <Badge text={props.plates || "其它"} style={{height : '.4rem', lineHeight:'.4rem', fontSize: '.30rem' , backgroundColor: '#33a3f4', borderRadius: 8 }} />
         <Badge text={props.status || "讨论中"} style={{height : '.4rem', lineHeight:'.4rem', fontSize: '.30rem' , backgroundColor: '#33a3f4', borderRadius: 8  , marginLeft: '10px'}} />
       </div>
      </div>
    </div>
  )
};

export default DiscussFoot

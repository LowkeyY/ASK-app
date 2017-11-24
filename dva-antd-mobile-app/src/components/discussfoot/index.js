import React from 'react'
import { getLocalIcon} from 'utils'
import { Tag ,Icon} from 'antd-mobile';
import styles from './index.less'
const PrefixCls='discussFoot';
const DiscussFoot =(props)=>{
  return(
    <div className={styles[`${PrefixCls}-box`]}>
      <div className={styles[`${PrefixCls}-box-btns-view`]}>
        <Icon type={getLocalIcon("/view.svg")} size="xs" color={"#ddd"}/>
        <span className={styles[`${PrefixCls}-box-btns-view-count`]}>234</span>
      </div>
      <div className={styles[`${PrefixCls}-box-btns`]}>
       <div className={styles[`${PrefixCls}-box-btns-collection`]}>
         <Tag selected>
           <span>收藏案例</span>
         </Tag>
       </div>
        <div className={styles[`${PrefixCls}-box-btns-discuss`]}
              onClick={props.goDiscuss}>
          <Icon type="info-circle" size="xs" />
          <span>评论</span>
        </div>
      </div>
    </div>
  )
};

export default DiscussFoot

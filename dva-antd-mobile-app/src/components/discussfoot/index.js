import React from 'react'
import { getLocalIcon} from 'utils'
import { Badge ,Icon , Tag} from 'antd-mobile';
import styles from './index.less'
const PrefixCls='discussFoot';
const DiscussFoot =(props)=>{
  return(
    <div className={styles[`${PrefixCls}-box`]}>
          {/*<div className={styles[`${PrefixCls}-box-inpt`]}>*/}
            {/*<input type="text"/>*/}
          {/*</div>*/}
      <div className={styles[`${PrefixCls}-box-btns-view`]}>
        <Icon type={getLocalIcon("/page/view.svg")} size="xs" color={"#888"}/>
        <span className={styles[`${PrefixCls}-box-btns-view-count`]}>{props.views || 0}</span>
      </div>
      <div className={styles[`${PrefixCls}-box-btns`]}>
       <div className={styles[`${PrefixCls}-box-btns-collection`]}>
         <Badge text={props.plates || "其它"} style={{height : '.4rem', lineHeight:'.4rem', fontSize: '.30rem' , backgroundColor: '#33a3f4', borderRadius: 8 }} />
         <Badge text={props.status || "讨论中"} style={{height : '.4rem', lineHeight:'.4rem', fontSize: '.30rem' , backgroundColor: '#33a3f4', borderRadius: 8  , marginLeft: '10px'}} />
{/*        <Tag>
            <Icon type={getLocalIcon("/page/collection.svg")} size="xs" />
            <span>收藏案例</span>
        </Tag>*/}
{/*                      <Tag>
                <Icon type={getLocalIcon("/page/collection.svg")} size="xs" />
                <span>收藏文档</span>
              </Tag>*/}
       </div>
      <div className={styles[`${PrefixCls}-box-btns-discuss`]} onClick={props.goDiscuss}>
        <Icon type="info-circle" size="xs" />
        <span>评论({props.replys || 0})</span>
      </div>
      </div>
    </div>
  )
};

export default DiscussFoot

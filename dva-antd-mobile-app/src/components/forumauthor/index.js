import React from 'react'
import { List,Tag} from 'antd-mobile';
import styles from './index.less'
const Item = List.Item;
const Brief = Item.Brief,
  defaultImgSrc = require("themes/images/user.png");
const PrefixCls='fornmdetails';
const ForumAuthor =(props)=>{
  return(
    <div>
      <List>
        <Item
          wrap="true"
        >
          <div className={styles[`${PrefixCls}-author-box`]}>
            <div  className={styles[`${PrefixCls}-author-box-information-box`]}>
              <img className={styles[`${PrefixCls}-author-box-icon`]} src={defaultImgSrc} alt=""/>
              <div className={styles[`${PrefixCls}-author-box-information`]}>
                <h5 className={styles[`${PrefixCls}-author-box-information-author`]}>
                  爱喝橙汁的金智媛(大将)
                </h5>
                <div className={styles[`${PrefixCls}-author-box-information-info`]}>
                    <p className={styles[`${PrefixCls}-author-box-information-info-integral`]}>积分:234</p>
                     <span className={styles[`${PrefixCls}-author-box-information-info-master`]}>楼主</span>
                </div>
              </div>
            </div>
            <div className={styles[`${PrefixCls}-author-box-follow-btn`]}>
              <Tag selected>关注</Tag>
            </div>
          </div>
          <div>
          </div>
        </Item>
      </List>
    </div>
  )
}

export default ForumAuthor
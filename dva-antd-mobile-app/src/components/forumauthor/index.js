import React from 'react'
import { List,Tag,Icon} from 'antd-mobile';
import {getLocalIcon} from 'utils'
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
              <img className={styles[`${PrefixCls}-author-box-icon`]} src={props.icon||defaultImgSrc} alt=""/>
              <div className={styles[`${PrefixCls}-author-box-information`]}>
                <h5 className={styles[`${PrefixCls}-author-box-information-author`]}>
                  {props.author}
                </h5>
                <div className={styles[`${PrefixCls}-author-box-information-info`]}>
                    <p className={styles[`${PrefixCls}-author-box-information-info-integral`]}>身份:{props.grade}</p>
                </div>
              </div>
            </div>
            <div className={styles[`${PrefixCls}-author-box-information-right`]}>
                <span className={styles[`${PrefixCls}-author-box-information-info-master`]}>
                  <Icon type={getLocalIcon("/page/楼主.svg")}/>
                  &nbsp;楼主
                </span>
              <div className={styles[`${PrefixCls}-author-box-information-info`]}>
                <p className={styles[`${PrefixCls}-author-box-information-info-integral`]}> {props.creates}</p>
              </div>
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

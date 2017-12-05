import React from 'react'
import { List} from 'antd-mobile';
import styles from './noticeitem.less'
import pagecontentstyles from 'themes/content.less'
const Item = List.Item , Brief = Item.Brief, PrefixCls="noticeitem";
class NoticeItem extends React.Component{

  constructor(props){
    super(props)
  }
  render(){
    const pageFontsize=this.props.pageFontsize;
    return(
      <div>
        <Item className={`${PrefixCls}-row`}
              multipleLine
              key
              wrap
        >
          <div className={`title page-content ${pageFontsize}`}><h3 className={styles[`${PrefixCls}-content`]}>{this.props.obj.title}</h3></div>
          <Brief>{`${this.props.obj.author} - (${this.props.obj.date})`}</Brief>
        </Item>
      </div>
    )
  }
}
export default NoticeItem

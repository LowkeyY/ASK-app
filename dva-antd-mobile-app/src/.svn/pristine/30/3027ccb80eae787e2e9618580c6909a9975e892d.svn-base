import React from 'react'
import { List } from 'antd-mobile';
import styles from './contenttitle.less'
const Item = List.Item;
const Brief = Item.Brief,
  defaultImgSrc = require("themes/images/user.png");

const CaseContentTitle =(props)=>{
  return(
    <div>
        <List>
          <Item
            wrap="true"
          >
            <div className={styles['case-title-box']}>
              <img className={styles['case-icom']} src={defaultImgSrc} alt=""/>
              <h3 className={styles['case-title']}>{props.casecontenttitle}</h3>
            </div>
            <div>
            </div>
          </Item>
        </List>
    </div>
  )
}

export default CaseContentTitle

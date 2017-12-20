import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { List } from 'antd-mobile'
import styles from './discuss.less'

function Discuss () {
  const Item = List.Item;

  return (<div>
    <List className="my-list">

      <Item align="top" multipleLine wrap>
        <a href="#" className={styles['discuss-person']}>采姑娘的小蘑菇:</a>
        <p className={styles['discuss-content']}>听这个版本的时候，我吃着一碗水饺，然后，听着听着想啊想啊，泪哗哗的下啊下啊下啊下啊下啊下啊，在碗里，苦咸。那年，我三十八岁。</p>
        <div>
          <span className={styles['discuss-time']}>2017年10月22日</span>
        </div>
      </Item>
    </List>
  </div>)
}


export default connect(({ Discuss, loading }) => ({ Discuss, loading }))(Discuss)

import React from 'react'
import { List } from 'antd-mobile';
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import Dialogue from './component/dialogue'
import Nav from '../../components/Layout/navbar'
import BaseLine from '../../components/Layout/baseline'
import styles from './index.less'
const Item = List.Item;

function Discuss ({dispatch}) {
  const goBack = ()=> {
    dispatch(routerRedux.goBack())
  };
          return (
            <div>
              <div className={styles['discuss-head']}>
                <div className={styles['discuss-head-line']}>

                </div>
                <p className={styles['discuss-head-text']}>
                  评论
                  <span className={styles['discuss-head-text-total']}>28</span>
                </p>
              </div>
              <List>
                <Dialogue/>
              </List>

            </div>
          )
}
export default connect(({ discuss, loading }) => ({ discuss, loading }))(Discuss);

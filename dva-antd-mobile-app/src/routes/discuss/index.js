import React from 'react'
import { List } from 'antd-mobile';
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import InputFoot from '../../components/inputfoot/inputfoot'
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
              <Nav goBack={goBack} title="评论"/>
              <List>
                <Dialogue/>
              </List>
              <BaseLine/>
              <InputFoot />
            </div>
          )
}
export default connect(({ discuss, loading }) => ({ discuss, loading }))(Discuss);

import React from 'react'
import { List } from 'antd-mobile';
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import Dialogue from './component/dialogue'
import { BaseLine } from 'components/Layout'
import styles from './index.less'
const Item = List.Item;

function Discuss({dispatch, commendProps,app}) {
    const {currentComments, moduleId, id} = commendProps,{ pageFontsize } = app;
    const goBack = () => {
            dispatch(routerRedux.goBack())
        },
        handleDeleteClick = (id) => {
            dispatch({
                type: "details/deleteCommends",
                payload: {
                    id
                }
            })
        };

    return (
        <div>
          <div className={ styles['discuss-head'] }>
            <div className={ styles['discuss-head-line'] }>
            </div>
            <p className={ styles['discuss-head-text'] }>
              <a id="discuss"></a> 评论
            </p>
          </div>
          <List>
            { currentComments&&currentComments.map((data) => (
                  <Dialogue {...data} dispatch={ dispatch } handleDeleteClick={ handleDeleteClick } pageFontsize={pageFontsize}/>
              )) }
          </List>
        </div>
    )
}
export default connect(({discuss, loading,app}) => ({
    discuss,
    loading,
    app
}))(Discuss);

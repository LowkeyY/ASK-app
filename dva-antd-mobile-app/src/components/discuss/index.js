import React from 'react'
import { List, WhiteSpace, SegmentedControl } from 'antd-mobile';
import { connect } from 'dva'
import Liked from './component/liked'
import Dialogue from './component/dialogue'
import styles from './index.less'
const Item = List.Item;
function Discuss ({dispatch,discuss}) {
  const {selectedId} = discuss,
    handleChange = (e) => {
      dispatch({type: 'discuss/updateState', payload: {selectedId: e.nativeEvent.selectedSegmentIndex}})
    },
    renderPage = (selectedId = 0) => {
      switch (selectedId) {
        case 0 : {
          return (
            <div>
              <List>
                <Dialogue/>
                <Dialogue/>
              </List>
            </div>
          )
        }
        case 1 : {
          return (
            <div className={styles['liked-box']}>
              <Liked/>
            </div>
          )
        }
      }
    };
  return (
    <div>
      <SegmentedControl values={['评论', '赞']}
                        selectedIndex={selectedId}
                        onChange={handleChange}
      />
      {renderPage(selectedId)}
    </div>
  )
}
export default connect(({ discuss, loading }) => ({ discuss, loading }))(Discuss)

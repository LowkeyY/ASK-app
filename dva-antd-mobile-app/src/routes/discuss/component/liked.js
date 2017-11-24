import React from 'react'
import { List } from 'antd-mobile';
const Item = List.Item;
function Liked() {
  return(
    <div>
      <List>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
        >刘德华（小兵）</Item>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
        >
         刘亦菲（将军）
        </Item>
      </List>
    </div>
  )
}

export default Liked

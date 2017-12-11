import React from 'react';
import styles from './inputfoot.less'
import { Button, Icon} from 'antd-mobile';
import { getLocalIcon } from 'utils'
const PrefixCls='inputfoot';
function InputFoot(props) {

  return(
    <div>
      <div className={styles[`${PrefixCls}-input-box`]}>
        <input className={styles[`${PrefixCls}-input`]} type="text" placeholder="添加评论"/>
        <div className={styles[`${PrefixCls}-sendbtn`]}>
          {/*<Icon key="1" type={getLocalIcon("/pave/sendbtn.svg")} />*/}
          <Button size="small">发送</Button>
        </div>
      </div>
    </div>
  )
}
export default InputFoot

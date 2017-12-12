import React from 'react';
import styles from './inputfoot.less'
import { Button, Icon} from 'antd-mobile';
import { getLocalIcon } from 'utils'
const PrefixCls='inputfoot';
class InputFoot extends React.Component{
  constructor(props){
    super()
    this.state={
      isShowInputFoot:true,
      isShowEditor:false
    }
  }

  hiddenINputFoot=()=>{
    console.log(this.props)
      let anchorElement = document.getElementById('discuss');
      if(anchorElement) { anchorElement.scrollIntoView(); }
    this.props.dispatch({
           type:'app/updateState' , payload : {isShowEditor:true}
         })
  }
  render(){
    const isShowInputFoot=this.props.isShowInputFoot?{display:"block"}:{display:"none"}
    return(
      <div style={isShowInputFoot}>
        <div className={styles[`${PrefixCls}-input-box`]}>
          <input className={styles[`${PrefixCls}-input`]}
                 type="text" placeholder="添加评论"
                 onFocus={this.hiddenINputFoot}
          />
          <div className={styles[`${PrefixCls}-sendbtn`]}>
            {/*<Icon key="1" type={getLocalIcon("/page/评论.svg")} />*/}
            <Button size="small">发送</Button>
          </div>
        </div>
      </div>
    )
  }

}
InputFoot.defaultProps = {
  isShowInputFoot: true
}
export default InputFoot

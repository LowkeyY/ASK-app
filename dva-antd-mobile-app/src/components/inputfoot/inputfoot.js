import React from 'react';
import styles from './inputfoot.less'
import PropTypes from 'prop-types';
const PrefixCls='inputfoot';
class InputFoot extends React.Component{
  constructor(props){
    super()
    this.state={
      isShowInputFoot:true,
      isShowEditor:false
    }
  }

  goDiscuss=()=>{
  let anchorElement = document.getElementById('discuss');
  if(anchorElement) { anchorElement.scrollIntoView(); }
}
  hiddenINputFoot=()=>{
    setTimeout(function(){
      document.documentElement.scrollTop = document.body.scrollHeight;
    },300);
      let anchorElement = document.getElementById('discuss');
      if(anchorElement) { anchorElement.scrollIntoView();}
    this.props.dispatch({
           type:'details/updateState' , payload : {isShowEditor:true,placeholder:'请输入内容...'}
         })
  }
  render(){
    const isShowInputFoot=this.props.isShowInputFoot?{display:"block"}:{display:"none"}
    const currentComments=this.props.currentComments||[];
    const discussLength=currentComments.length;
    let replyLength=0;
    {
      currentComments.map((data)=>{
        if(typeof (data.items)==='Array')
        replyLength += data.items.length
      }
    )
    }
    const total=discussLength+replyLength
    return(
      <div style={isShowInputFoot} >
        <div className={styles[`${PrefixCls}-input-box`]}>
          <input className={styles[`${PrefixCls}-input`]}
                 type="text" placeholder="添加评论"
                 disabled={true}
                 onTouchEnd={this.hiddenINputFoot}
          />
          <div onTouchEnd={this.goDiscuss} className={styles[`${PrefixCls}-info`]}>
            <div className={styles[`${PrefixCls}-info-discuss`]}>
              {`评论(${total})`||0}
            </div>

          </div>
        </div>
      </div>
    )
  }
 static propTypes = {
    dispatch: PropTypes.func.isRequired,
    moduleId: PropTypes.number.isRequired
  };
}
InputFoot.defaultProps = {
  isShowInputFoot: true
}
export default InputFoot

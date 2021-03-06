import React from 'react';
import styles from './inputfoot.less'
import PropTypes from 'prop-types';
const PrefixCls = 'inputfoot';
class InputFoot extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isShowInputFoot: true,
            isShowEditor: false
        }
    }

    goDiscuss = () => {
        let anchorElement = document.getElementById('discuss');
        if (anchorElement) {
            anchorElement.scrollIntoView();
        }
    }
    toBlur=()=>{//解决iosreadonly依然获取光标

      this.refs.inputfoot.blur()
    }
    hiddenINputFoot = (e) => {
        e.stopPropagation();
        this.props.dispatch({
            type: 'details/updateState',
            payload: {
                isShowEditor: true,
                placeholder: '请输入内容...',
                currentRecommentId: "",
                 isShowInputFoot:false
            }
        })


    }
    getChildren = (items, children) => {
        items.map(item => {
            children.push(item);
            if (item.items && item.items.length)
                getChildren(item.items, children);
        })
    }
    render() {
        const isShowInputFoot = this.props.isShowInputFoot ? {
            display: "block"
        } : {
            display: "none"
        }
        const currentComments = this.props.currentComments || [];
        const discussLength = currentComments.length;
        const children = [];
        let replyLength = 0;
        {
            currentComments.map((data) => {
                const {items=[]} = data
            }
            )
        }
        const total = discussLength + replyLength
        return (
            <div style={ isShowInputFoot }>
              <div className={ styles[`${PrefixCls}-input-box`] }>
                <input className={ styles[`${PrefixCls}-input`] }
                       ref='inputfoot'
                       type="text" placeholder="添加评论"
                       readOnly={ true }
                       onClick={ this.hiddenINputFoot }
                        onFocus={this.toBlur}
                />
                <div onClick={ this.goDiscuss } className={ styles[`${PrefixCls}-info`] }>
                  <div className={ styles[`${PrefixCls}-info-discuss`] }>
                    { `评论(${total})` || 0 }
                  </div>
                </div>
              </div>
            </div>
        )
    }
    static propTypes = {
        dispatch: PropTypes.func.isRequired,

    };
}
InputFoot.defaultProps = {
    isShowInputFoot: true
}
export default InputFoot

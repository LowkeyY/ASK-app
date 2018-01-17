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
    hiddenINputFoot = (e) => {
        e.stopPropagation();
        setTimeout(function() {
            document.documentElement.scrollTop = document.body.scrollHeight;
        }, 300);
        let anchorElement = document.getElementById('discuss');
        if (anchorElement) {
            anchorElement.scrollIntoView();
        }
        this.props.dispatch({
            type: 'details/updateState',
            payload: {
                isShowEditor: true,
                placeholder: '请输入内容...',
                currentRecommentId: ""
            }
        })
      // this.props.getFocus()
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
                <input className={ styles[`${PrefixCls}-input`] } type="text" placeholder="添加评论" readOnly={ true } onClick={ this.hiddenINputFoot } />
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
        moduleId: PropTypes.number.isRequired
    };
}
InputFoot.defaultProps = {
    isShowInputFoot: true
}
export default InputFoot

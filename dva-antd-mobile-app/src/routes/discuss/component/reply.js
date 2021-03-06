import React from 'react'
import styles from './reply.less'
import { Modal } from 'antd-mobile';
import pagecontentstyles from 'themes/content.less';
const alert = Modal.alert;
function Replay(props) {
    const createMarkup = () => {
        return {
            __html: props.contents
        };
    };
    const delReplay = () => {
        const alertInstance = alert('', '确定删除此条回复?', [
            {
                text: '取消',
                onPress: () => console.log('cancel'),
                style: 'default'
            },
            {
                text: '确定',
                onPress: props.handleDeleteClick.bind(null, props.id)
            },
        ]);
        setTimeout(() => {
            // 可以调用close方法以在外部close
            console.log('auto close');
            alertInstance.close();
        }, 10000);
    }
    return (
        <div className={ styles['reply-box'] }>
          <div className={ styles['reply-content'] }>
            <h5><a>{ `${props.name}(${props.grade})` }</a><span>回复</span><a>{ `${props.rname}(${props.rgrade})` }</a></h5>
            <div className={ `page-content ${props.pageFontsize}` } style={ { overflow: 'hidden' } }>
              <div className={ styles['reply-details'] } dangerouslySetInnerHTML={ createMarkup() } />
            </div>
            <div className={ styles['reply-container'] }>
            </div>
            <div className={ styles[`reply-others`] }>
              <p className={ styles[`reply-times`] }>
                { props.date }
              </p>
              <div className={ styles[`reply-btns`] }>
                <a style={ { display: props.hasDeleteAuth ? 'inline-block' : 'none' } } className={ styles['reply-delete-btn'] } onClick={ delReplay }>删除</a>
                <a className={ styles['reply-reply-btn'] } onClick={ props.makeDiscuss.bind(null, `回复：${props.name}`, props.id) }>回复</a>
              </div>
            </div>
          </div>
        </div>

    )
}
export default Replay

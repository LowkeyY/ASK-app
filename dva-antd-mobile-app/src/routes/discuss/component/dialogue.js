import React from 'react'
import {Modal} from 'antd-mobile';
import Replay from './reply'
import styles from './dialogue.less'
import pagecontentstyles from 'themes/content.less'

const defaultImgSrc = require("themes/images/user.png");
const alert = Modal.alert;
function Dialogue(props, dispatch) {
  const {items = []} = props,
    children = []
  const createMarkup = () => {
    return {
      __html: props.contents
    };
  };
  const makeDiscuss = (name) => {
    props.dispatch({
      type: 'details/updateState', payload: {isShowEditor: true, placeholder: name}
    })
  };
  const getChildren = (items, children) => {
    items.map(item => {
      children.push(item);
      if (item.items && item.items.length)
        getChildren(item.items, children);
    })
  }
  getChildren(items, children);
  const delDisscuss=()=>{
    const alertInstance = alert('', '确定删除此条评论?', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress:props.handleDeleteClick.bind(null, props.id) },
    ]);
    setTimeout(() => {
      // 可以调用close方法以在外部close
      console.log('auto close');
      alertInstance.close();
    },10000);
  }
  return (
    <div className={styles['dialogue-box']}>
      <div className={styles['dialogue-title-box']}>
        <img className={styles['dialogue-image']} src={props.icon || defaultImgSrc} alt=""/>
        <div className={styles['dialogue-info']}>
          <h5 className={styles['dialogue-author']}>{`${props.name}(${props.grade})`}</h5>
          <p className={styles[`dialogue-times`]}>
            {props.date}
          </p>
        </div>
      </div>
      <div className={styles['dialogue-content']}>
        <div className={`page-content ${props.pageFontsize}`} style={{overflow: 'hidden'}}>
          <div className={styles['dialogue-details']} dangerouslySetInnerHTML={createMarkup()}/>
        </div>
        <div className={styles['dialogue-reply-box']}>
          {children && children.map((data) => {
            return <Replay key={data.id} {...data} handleDeleteClick={props.handleDeleteClick}
                           makeDiscuss={makeDiscuss} pageFontsize={props.pageFontsize}
            />
          })}
        </div>
        <div className={styles[`dialogue-btns`]}>
          <a onClick={delDisscuss} className={styles['dialogue-delete-btn']}>删除</a>
          <a className={styles['dialogue-reply-btn']} onTouchEnd={makeDiscuss.bind(null, `回复：${props.name}`)}>回复</a>
        </div>
      </div>
    </div>
  )
}

export default Dialogue

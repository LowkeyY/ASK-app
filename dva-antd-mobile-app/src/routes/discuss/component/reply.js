import React from 'react'
import styles from './reply.less'
import pagecontentstyles from 'themes/content.less'

const  defaultImgSrc = require("themes/images/user.png");
function Replay(props) {
  const  createMarkup = () => {
    return {
      __html:props.contents
    };
  };
  return(
    <div className={styles['reply-box']}>
      {/*<img src={defaultImgSrc} alt=""/>*/}
      <div className={styles['reply-content']}>
        <h5><a>{`${props.name}(${props.grade})`}</a><span>回复</span><a>{`${props.rname}(${props.rgrade})`}</a></h5>
        <div className={`page-content ${props.pageFontsize}`} style={{overflow:'hidden'}}>
        <div className={styles['reply-details']} dangerouslySetInnerHTML={createMarkup() }/>
        </div>
        <div className={styles['reply-container']}>
        </div>
        <div className={styles[`reply-others`]}>
          <p className={styles[`reply-times`]}>{props.date}</p>
          <div className={styles[`reply-btns`]}>
            <a className={styles['reply-delete-btn']}>删除</a>
            <a className={styles['reply-reply-btn']} onTouchEnd={props.makeDiscuss.bind(null,`回复：${props.name}`)}>回复</a>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Replay

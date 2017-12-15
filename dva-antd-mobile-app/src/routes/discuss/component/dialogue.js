import React from 'react'
import Replay from './reply'
import styles from './dialogue.less'
import pagecontentstyles from 'themes/content.less'
const  defaultImgSrc = require("themes/images/user.png");
function Dialogue(props,dispatch) {
  const items = props.items||[]
  const  createMarkup = () => {
    return {
      __html:props.contents
    };
  };
  const makeDiscuss=(name)=>{
    props.dispatch({
      type:'details/updateState' , payload : {isShowEditor:true,placeholder:name}
    })
  }

  return(
    <div className={styles['dialogue-box']}>
      <div className={styles['dialogue-title-box']}>
      <img className={styles['dialogue-image']} src={props.icon||defaultImgSrc} alt=""/>
        <div className={styles['dialogue-info']}>
          <h5 className={styles['dialogue-author']}>{`${props.name}(${props.grade})`}</h5>
          <p className={styles[`dialogue-times`]}>{props.date}</p>
        </div>
       </div>
      <div className={styles['dialogue-content']}>
        <div className={`page-content ${props.pageFontsize}`} style={{overflow:'hidden'}}>
       <div className={styles['dialogue-details']} dangerouslySetInnerHTML={createMarkup() }/>
        </div>
        <div className={styles['dialogue-reply-box']}>
          {
            items.map((data)=>{
                return <Replay key={data.id} {...data} makeDiscuss={makeDiscuss} pageFontsize={props.pageFontsize}/>
          })
          }
        </div>
        <div className={styles[`dialogue-btns`]}>
            <a className={styles['dialogue-delete-btn']}>删除</a>
            <a className={styles['dialogue-reply-btn']} onTouchEnd={makeDiscuss.bind(null,`回复：${props.name}`)}>回复</a>
        </div>
      </div>
    </div>
  )
}
export default Dialogue

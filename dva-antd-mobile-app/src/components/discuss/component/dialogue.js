import React from 'react'
import Replay from './reply'
import styles from './dialogue.less'
const  defaultImgSrc = require("themes/images/user.png");
function Dialogue() {
  return(
    <div className={styles['dialogue-box']}>
      <img src={defaultImgSrc} alt=""/>
      <div className={styles['dialogue-content']}>
         <h5>采姑娘的小蘑菇(小兵)</h5>
        <p className={styles['dialogue-details']}>听这个版本的时候，我吃着一碗水饺，然后，听着听着想啊想啊，泪哗哗的下啊下啊下啊下啊下啊下啊，在碗里，苦咸。那年，我三十八岁。</p>
        <div className={styles['dialogue-reply-box']}>
          <Replay/>
        </div>
        <div className={styles[`dialogue-others`]}>
          <span className={styles[`dialogue-times`]}>2017-5-4 06:09:07</span>
          <a className={styles['dialogue-reply-btn']}>回复</a>
        </div>
      </div>

    </div>
  )
}
export default Dialogue

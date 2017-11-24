import React from 'react'
import styles from './reply.less'

const  defaultImgSrc = require("themes/images/user.png");
function Replay() {
  return(
    <div className={styles['reply-box']}>
      <img src={defaultImgSrc} alt=""/>
      <div className={styles['reply-content']}>
        <h5><a>缝小肛(小兵)</a><span>回复</span><a>采姑娘的小蘑菇(小兵)</a></h5>
        <p className={styles['reply-details']}>听你说的我都哭了 </p>
        <div className={styles['reply-container']}>
        </div>
        <div className={styles[`reply-others`]}>
          <span className={styles[`reply-times`]}>2017-5-4 06:09:07</span>
          <a className={styles['reply-reply-btn']}>回复</a>
        </div>
      </div>
    </div>
  )
}
export default Replay

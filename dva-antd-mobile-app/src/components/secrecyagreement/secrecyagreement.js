import { NoticeBar, WhiteSpace, Icon } from 'antd-mobile';
import './secrecyagreement.less'
const SecrecyAgreement =()=>{
  return(
    <div>
      <NoticeBar marqueeProps={{ loop: true, style: {color:'red',background:'#fff'} }}>
        此文件仅作为公司内部使用，使用人应承担保密义务，如因违反规定而造成公司保密文件外泄情况发生,使用人应承担一切损失与后果。
      </NoticeBar>
    </div>
  )
}
export default SecrecyAgreement

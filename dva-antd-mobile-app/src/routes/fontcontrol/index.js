import React from 'react';
import { List,NavBar} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import FontSlider from './componenet/slider'
import CaseContentTitle from '../../components/contenttitle/contenttitle'
import SecrecyAgreement from '../../components/secrecyagreement/secrecyagreement'
import { connect } from 'dva';
import styles from './index.less'
const Item = List.Item,
 Brief = Item.Brief,
  PrefixCls='fontsizepage';
function FontSizePage({loading,dispatch,fontcontrol}) {
  const goBack = ()=> {
    dispatch(routerRedux.goBack())
  };
  const getFontSize=(size)=>{
      if(size===0){
        dispatch({
          type:'fontcontrol/small'
        })
      }
      if(size===50){
        dispatch({
          type:'fontcontrol/normal'

        })
      }
      if(size===100){
        dispatch({
          type:'fontcontrol/big'
        })
      }
  }
  return(
    <div>
      <div className={styles[`${PrefixCls}-header`]}>
        <NavBar leftContent="返回"
                mode="light"
                onLeftClick={goBack}
                rightContent={<a>保存</a>}
        >字体大小</NavBar>
      </div>
      <div>
        <CaseContentTitle casecontenttitle={'预览字体大小'}/>
      </div>
      <List><Item><SecrecyAgreement/></Item></List>
      <div className={styles[`${PrefixCls}-preview-size`]}>
        <Item>详情</Item>
        <Item
          wrap
        >
         <p className={styles[`${PrefixCls}-font`]}
              style={{fontSize:fontcontrol}}>
            常记溪亭日暮，
           <br/>
            沉醉不知归路，
           <br/>
            兴尽晚回舟，
           <br/>
            误入藕花深处。
           <br/>
            争渡，争渡，惊起一滩鸥鹭。</p>
        </Item>
      </div>
      <FontSlider controlSize={getFontSize}/>
    </div>
  )
}
export default  connect(({ loading,fontcontrol }) => ({ loading,fontcontrol}))(FontSizePage);

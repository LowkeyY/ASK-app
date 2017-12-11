import React from 'react';
import { List,NavBar,Button} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import FontSlider from './componenet/slider'
import CaseContentTitle from '../../components/contenttitle/contenttitle'
import SecrecyAgreement from '../../components/secrecyagreement/secrecyagreement'
import { connect } from 'dva';
import styles from './index.less'
import pagecontentstyles from 'themes/content.less'
const Item = List.Item,
 Brief = Item.Brief,
  PrefixCls='fontsizepage';
function FontSizePage({loading , dispatch , fontcontrol}) {
  const {fontSize} =  fontcontrol;
  const goBack = ()=> {
    dispatch(routerRedux.goBack())
  };
  const getFontSize=(size)=>{
      // const newSize = size===100 ? "large" : size===0 ? "small" : "normal";
     let newSize;
    switch (size){
      case 0 :  newSize='min';break
      case 25 : newSize='small';break
      case 50 : newSize='normal';break
      case 75 : newSize='large';break
      case 100 :newSize='max';break
    }
      dispatch({
          type:'fontcontrol/updateState' , payload : {fontSize : newSize}
      })
  }

  const saveFontSize = ()=>{
      dispatch({
          type:'app/updateState' , payload : {pageFontsize : fontSize}
      })
    dispatch(routerRedux.push({pathname: "/page02"}));
  }

  return(
    <div>
      <div className={styles[`${PrefixCls}-header`]}>
        <NavBar leftContent="返回"
                mode="light"
                onLeftClick={goBack}
                rightContent={<Button type="primary" inline size="small" onClick={saveFontSize}>保存</Button>}
        >字体大小</NavBar>
      </div>
      <div>
        <CaseContentTitle casecontenttitle={'预览字体大小'}/>
      </div>
      <List><Item><SecrecyAgreement/></Item></List>
      <div className={`page-content ${fontSize}`}>
        <p>【详情】</p>
        <p>  常记溪亭日暮，</p>
        <p>  沉醉不知归路，</p>
        <p>  兴尽晚回舟，</p>
        <p>  误入藕花深处。</p>
        <p>  争渡，争渡，惊起一滩鸥鹭。</p>
      </div>
      <FontSlider fontSize={fontSize} controlSize={getFontSize}/>
    </div>
  )
}
export default  connect(({ loading,fontcontrol }) => ({ loading,fontcontrol}))(FontSizePage);

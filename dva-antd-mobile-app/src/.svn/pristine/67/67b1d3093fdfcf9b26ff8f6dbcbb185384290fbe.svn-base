import React from 'react';
import {List, Button} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import FontSlider from './componenet/slider'
import Nav from 'components/Layout/nav'
import CaseContentTitle from '../../components/contenttitle/contenttitle'
import {Warnings} from 'components/Layout'
import {connect} from 'dva';
import styles from './index.less'
import pagecontentstyles from 'themes/content.less'

const Item = List.Item,
  Brief = Item.Brief,
  PrefixCls = 'fontsizepage';

function FontSizePage({loading, dispatch, fontcontrol,app}) {
  const {fontSize} = fontcontrol,{user:{userPic}}=app;

  const getFontSize = (size) => {
    let newSize;
    switch (size) {
      case 0:
        newSize = 'min';
        break
      case 25:
        newSize = 'small';
        break
      case 50:
        newSize = 'normal';
        break
      case 75:
        newSize = 'large';
        break
      case 100:
        newSize = 'max';
        break
    }
    dispatch({
      type: 'fontcontrol/updateState',
      payload: {
        fontSize: newSize
      }
    })
  }

  const saveFontSize = () => {
    dispatch({
      type: 'app/userData',
      payload: {
        value: fontSize
      }
    })
  }
  const renderNavRight=()=>{
    return <Button type="ghost" inline size="small" onClick={saveFontSize} >保存</Button>
  }
  return (
    <div>
      <Nav dispatch={dispatch} title="字体大小" renderNavRight={renderNavRight()}/>
      <div>
        <CaseContentTitle casecontenttitle={'预览字体大小'} userPic={userPic}/>
      </div>
      <Warnings/>
      <div className={`page-content ${fontSize}`}>
        <p>
          【详情】
        </p>
        <p>
          常记溪亭日暮，
        </p>
        <p>
          沉醉不知归路，
        </p>
        <p>
          兴尽晚回舟，
        </p>
        <p>
          误入藕花深处。
        </p>
        <p>
          争渡，争渡，惊起一滩鸥鹭。
        </p>
      </div>
      <FontSlider fontSize={fontSize}  controlSize={getFontSize}/>
    </div>
  )
}

export default connect(({loading, fontcontrol,app}) => ({
  loading,
  fontcontrol,
  app
}))(FontSizePage);

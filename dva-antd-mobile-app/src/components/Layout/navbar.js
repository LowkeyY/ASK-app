import React from 'react';
import { NavBar } from 'antd-mobile';

const css ={
  color:'#108ee9',
  fontSize:'.32rem'
};
const fix={
  width:'100%',
 position:'fixed',
  top:'0',
  left:'0',
  zIndex:'2'
};

function Nav(props) {

  return(
    <div style={{height:'45px'}}>
    <div style={fix}>
      <NavBar
        mode="light"
        leftContent="返回"
        onLeftClick={props.goBack}
      >
        <p style={css}>{props.title}</p>
      </NavBar>
    </div>
    </div>
  )
}
export default Nav

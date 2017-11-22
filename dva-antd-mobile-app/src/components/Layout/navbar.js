import React from 'react';
import { NavBar } from 'antd-mobile';

function Nav(props) {

  return(

    <div>
      <NavBar
        mode="light"
        leftContent="返回"
        onLeftClick={props.goBack}
      >
      </NavBar>
    </div>
  )
}
export default Nav

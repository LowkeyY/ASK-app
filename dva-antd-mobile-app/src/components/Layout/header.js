import React from 'react';
import PropTypes from 'prop-types';
import {  NavBar, Icon , Button , Badge} from 'antd-mobile';
import { routerRedux , Link} from 'dva/router';
import { isEmptyObject , getLocalIcon} from 'utils'
import './index.less';

function Header({
  dispatch , title = "" , navbars = {}
}) {
  const goBack = ()=>{
    dispatch(routerRedux.goBack());
  };
  const {leftContent = "返回" , leftClick = goBack , rightContent = []} = navbars;
  return (
      <NavBar 
        className={"page-header"}
        mode="dark"
        leftContent={leftContent}
        onLeftClick={leftClick}
        rightContent
      >{title}</NavBar>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default Header;

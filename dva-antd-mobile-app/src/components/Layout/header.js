import React from 'react';
import PropTypes from 'prop-types';
import {  NavBar, Icon , Button , Badge} from 'antd-mobile';
import { routerRedux , Link} from 'dva/router';
import { isEmptyObject , getLocalIcon} from 'utils'

import styles from './header.less';

function Header({
  dispatch , froms = "/" , defaultSearchText = "" , leftContent = {} , rightContent = {icon : "/header/news.svg" , to : "/mylist" , dot : true}
}) {
  const goSearch = ()=>{
    dispatch(routerRedux.push({pathname:"/search"}))
  } , goDest = () =>{
    dispatch(routerRedux.push({pathname:rightContent.to}))
  } , packBtn = (obj) => {
    if(!isEmptyObject(obj)){
    }
    return "";
  }
  return (
      <div className={styles["navbar-fixed"]}>
        {!isEmptyObject(leftContent) && leftContent.hasOwnProperty("icon") ? 
          <div className={styles["navbar-fixed-left"]}>
            <span><Icon key="2" type="down"/></span>
          </div> : ""}
        <div className={styles["navbar-fixed-center"]}>
          <Button className={`btn ${styles.search}`} inline size="small" icon="search" onClick = {goSearch}>
            请输入搜索内容
          </Button>
        </div>
        <div className={styles["navbar-fixed-right"]}>
            <Link to={`${rightContent.to}`}>
              <Badge dot={!!rightContent.dot}>
                <Icon key="1" type={getLocalIcon(rightContent.icon)} />
              </Badge>
            </Link>
        </div>
      </div>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default Header;

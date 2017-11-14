import React from 'react';
import PropTypes from 'prop-types';
import {  NavBar, Icon , Button , Badge} from 'antd-mobile';
import { routerRedux , Link} from 'dva/router';
import { isEmptyObject , getLocalIcon} from 'utils'

import styles from './header.less';

function Header({
  dispatch , froms = "/" , defaultSearchText = "" , leftContent = {} , rightContent = {icon : "/message.svg" , to : "/mylist" , dot : true}
}) {
  const goSearch = ()=>{
    dispatch(routerRedux.push({pathname:"/search" , query : {froms}}))
  } , goDest = () =>{
    dispatch(routerRedux.push({pathname:rightContent.to , query : {froms}}))
  }
  return (
      <div className={styles["navbar-fixed"]}>
        {!isEmptyObject(leftContent) ? <div className={styles["navbar-fixed-left"]}>
            <span>经典案例</span>
            <span><Icon key="2" type="down"/></span>
        </div> : ""}
        <div className={styles["navbar-fixed-center"]}>
          <Button className={`btn ${styles.search}`} inline size="small" icon="search" onClick = {goSearch}>
            请输入搜索内容
          </Button>
        </div>
        <div className={styles["navbar-fixed-right"]}>
            <Link to={`${rightContent.to}?froms=${froms}&title=我的消息`}>
              <Badge dot={!!rightContent.dot}>
                <span style={{color: "#108ee9"}}>
                  <Icon key="1" type={getLocalIcon(rightContent.icon)} />
                </span>
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

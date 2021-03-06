import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon, Button, Badge } from 'antd-mobile';
import { routerRedux, Link } from 'dva/router';
import { isEmptyObject, getLocalIcon } from 'utils';
import './header-search.less';

function HeaderSearch({dispatch, defaultSearchText = "请输入搜索内容", leftContent = {}, rightContent = {}}) {
    const goSearch = () => {
        dispatch(routerRedux.push({
            pathname: "/search"
        }))
    };

    const getHtml = (item, right) => {
        if (!isEmptyObject(item) && item.hasOwnProperty("icon")) {
            let html = <Badge dot={ item.dot === true }>
                         <Icon type={ getLocalIcon(item.icon) } />
                       </Badge>;
            if (item.onClick)
                html = <span onClick={ item.onClick }>{ html }</span>;
            else if (item.to)
                html = <Link to={ item.to }>
                         { html }
                       </Link>;
            return (
                <div className={ right === true ? "right" : "left" }>
                  { html }
                </div>
            )
        }
        return "";
    }

    return (
        <div className={ "header-search" }>
          { getHtml(leftContent) }
          <div className={ "center" } style={ isEmptyObject(leftContent) ? {
                                                  marginLeft: ".3rem"
                                              } : {} }>
            <Button className={ "header-search-btn" } inline size="small" icon="search" onClick={ goSearch }>
              { defaultSearchText }
            </Button>
          </div>
          { getHtml(rightContent, true) }
        </div>
        );
}

HeaderSearch.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default HeaderSearch;

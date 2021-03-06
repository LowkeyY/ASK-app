import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon, Tag, Modal } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { getLocalIcon, emptyFunc } from 'utils'
import './index.less';

const getTitle = (key) => {
        switch (key) {
        case '4':
            return '帖子详情';
        case '1':
            return '案例详情';
        case '2':
            return '文库详情';
        default:
            return '';
        }
    },
    PrefixCls = "page-content";
function Header({dispatch, moduleId, hasDeleteAuth = false, showCollect = true, isCollect = false, handleClick = emptyFunc}) {

    const title = getTitle(moduleId);

    const goBack = () => {
        dispatch(routerRedux.goBack())
    }

    const del = () => {
        const alertInstance = Modal.alert('删除', '确定删除?', [
            {
                text: '取消',
                style: 'default'
            },
            {
                text: '确定',
                onPress: handleClick
            },
        ]);
        setTimeout(() => {
            // 可以调用close方法以在外部close
            alertInstance.close();
        }, 10000);
    }

    const renderRightContent = () => {
        if (moduleId === '4' && hasDeleteAuth) {
            return [<p onClick={ del }>
                      删除
                    </p>]
        }
        if (showCollect && (moduleId === '2' || moduleId === '1')) {
            return [<Tag selected={ isCollect } onChange={ handleClick }>
                      <Icon type={ getLocalIcon('/page/collection.svg') } />
                      { isCollect
                        ?
                        <span className={ `${PrefixCls}-collection` }>已收藏</span>
                        : <span className={ `${PrefixCls}-collection` }>收藏</span> }
                    </Tag>]
        }
        return null;
    }
    return (
        <div className={ `${PrefixCls}-head-box` }>
          <div className={ `${PrefixCls}-nav` }>
            <NavBar mode="light" leftContent="返回" onLeftClick={ goBack } rightContent={ renderRightContent() }>
              <p className={ `${PrefixCls}-nav-title` }>
                { title }
              </p>
            </NavBar>
          </div>
        </div>
    )
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Header;

import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import { Loader } from 'components'
import { classnames, config, getLocalIcon } from 'utils'
import menus from 'utils/menus'
import { TabBar, Icon } from 'antd-mobile';
import './app.less'
import Error from './error'

const {prefix, openPages, noLoaderPages} = config,
    clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
let lastHref;

const App = ({children, dispatch, app, loading, location}) => {

    let {pathname} = location
    if (pathname.startsWith("file://")) //ios路径处理
        pathname = pathname.substr(7);
    pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
    pathname = pathname.endsWith('/index.html') ? "/" : pathname; //Android配置首页自启动
    const href = window.location.href,
        {isLayout = false} = app;

    // window.onresize=()=>{//解决Android键盘留白
    //   let  nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //     if(nowClientHeight<clientHeight){
    //
    //     }
    // }
  cnSetStatusBarStyle(pathname);
  if (lastHref !== href) {
        NProgress.start();
        if (!loading.global) {
            NProgress.done();
            lastHref = href
        }
    }

    if (openPages && openPages.includes(pathname)) {
        if (noLoaderPages.includes(pathname))
            return (<div>
                      { children }
                    </div>)
        return (<div>
                  <Loader spinning={ loading.effects[`${pathname.startsWith("/") ? pathname.substr(1) : pathname}/query`] } />
                  { children }
                </div>)
    }

    return (
        <TabBar unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={ false }>
          { menus.map((_, index) => {
                const props = Object.assign({
                    key: "meun_" + index,
                    selectedIcon: _.icon,
                    selected: pathname === _.route,
                    onPress: () => {
                        dispatch(routerRedux.push(_.route))
                    }
                }, _);
                props.icon = <Icon type={ getLocalIcon(props.icon) } />;
                props.selectedIcon = <Icon type={ getLocalIcon(props.selectedIcon) } />;
                return (
                    <TabBar.Item {...props}>
                      { children }
                    </TabBar.Item>
                )
            }) }
        </TabBar>
    )
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    app: PropTypes.object,
    loading: PropTypes.object,
}

export default connect(({app, loading}) => ({
    app,
    loading
}))(App)

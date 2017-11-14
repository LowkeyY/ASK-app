import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import { Loader } from 'components'
import { classnames, config , getLocalIcon} from 'utils'
import menus from 'utils/menus'
import { TabBar, Icon } from 'antd-mobile';
import './app.less'
import Error from './error'

const { prefix, openPages } = config;

let lastHref;

const App = ({ children, dispatch, app, loading, location }) => {
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const href = window.location.href

  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href
    }
  }

  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      hidden={false}
    >
      {menus.map((_ , index) => {
          const props = Object.assign({
            key : index,
            selectedIcon : _.icon,
            selected : pathname === _.route,
            onPress : () => {
              dispatch(routerRedux.push(_.route))
            }
          } , _);
          props.icon = <Icon type={getLocalIcon(props.icon)}/>;
          props.selectedIcon = <Icon type={getLocalIcon(props.selectedIcon)}/>;
          return (
            <TabBar.Item {...props}>
              {children}
            </TabBar.Item>
          )
        })}
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

export default connect(({ app, loading }) => ({ app, loading }))(App)

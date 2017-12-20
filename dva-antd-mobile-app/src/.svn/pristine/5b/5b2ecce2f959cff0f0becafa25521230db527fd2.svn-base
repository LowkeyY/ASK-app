import React from 'react';
import PropTypes from 'prop-types';
import {
  TabBar,Icon
} from 'antd-mobile';
import {
  connect
} from 'dva';
import {
  routerRedux
} from 'dva/router';

import styles from './footer.less';

function Footer({
  dispatch, childrens, location
}) {
  return (
    <div className={styles.normal}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={false}
      >
        <TabBar.Item
          title="首页"
          key="首页"
          icon={<Icon type='home'/>}
          selectedIcon={<Icon type='home'/>}
          selected={location.pathname === '/'}
          onPress={() => dispatch(routerRedux.push('/'))}
        >
          {childrens}
        </TabBar.Item>
        <TabBar.Item
          title="分类检索"
          key="分类检索"
          icon={<Icon type='ellipsis-circle'/>}
          selectedIcon={<Icon type='ellipsis-circle'/>}
          selected={location.pathname === '/page01'}
          onPress={() => dispatch(routerRedux.push('/page01'))}
        >
          {childrens}
        </TabBar.Item>
        <TabBar.Item
          title="全文检索"
          key="全文检索"
          icon={<Icon type='search'/>}
          selectedIcon={<Icon type='search'/>}
          selected={location.pathname === '/page02'}
          onPress={() => dispatch(routerRedux.push('/page02'))}
        >
          {childrens}
        </TabBar.Item>
      </TabBar>
    </div>
  );
}

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childrens: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Footer);

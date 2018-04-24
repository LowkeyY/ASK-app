import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs'
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Card, WingBlank, WhiteSpace, Grid, NavBar, Icon, SearchBar, Button, List, NoticeBar, Badge, Modal, RefreshControl } from 'antd-mobile';
import { Layout } from 'components'
import styles from './index.less';
import HotWords from '../hotwords/index';
import { getLocalIcon } from 'utils';
import ListViews from 'components/listviews';

const Item = List.Item;
const Brief = Item.Brief;

function Dashboard({dashboard, loading, dispatch}) {
    const {Headersearch, BaseLine} = Layout,
        PrefixCls = "dashboard",
        {hasNews, modules, lists, notes, hotWords, isModalShow, hotWordModuleId, noteModuleId, dashboardRefreshing, dataSource, defalutHeight} = dashboard,
        handleClickId = lists[0] && lists[0].id

    const handleNeedRefreshing = () => {
            //跳转时，开启分类检索页面刷新。
            dispatch({
                type: "typequery/updateState",
                payload: {
                    refreshing: true
                }
            });
        },
        handleGirdClick = (moduleId) => {
            handleNeedRefreshing();
            dispatch(routerRedux.push({
                pathname: "/typequery",
                query: {
                    moduleId
                }
            }));
        },
        handleListItemClick = (moduleId, pageId) => {
            dispatch(routerRedux.push({
                pathname: "/details",
                query: {
                    moduleId,
                    id: pageId
                }
            }));
        },
        handleNoticeClick = () => {
            dispatch({
                type: 'dashboard/updateState',
                payload: {
                    isModalShow: !isModalShow
                }
            })
        },
        onRefresh = () => {
            dispatch({
                type: 'dashboard/query',
            })
            dispatch({
                type: 'dashboard/updateState',
                payload: {
                    dashboardRefreshing: true
                }
            })
        },
        onEndReached = () => {
            return;
        };

    const onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    const renderRow = (obj, sectionID, rowID) => {
        let isNew = obj.isNew === true;
        let result = (
        <Item arrow="horizontal"
          multipleLine
          onClick={ handleListItemClick.bind(null, handleClickId, obj.id) }
          key={ `${sectionID}-${rowID}` }
          wrap>
          <span className={ styles[`${PrefixCls}-list-body`] + " " + (isNew ? styles[`${PrefixCls}-list-isNew`] : "") }>{ obj.title }</span>
          <Brief>
            { `${obj.author} - (${obj.date})` }
          </Brief>
        </Item>
        );
        return !isNew ? result :
            <Badge key={ `badge-${sectionID}` } text={ '新' } corner>
              { result }
            </Badge>
    }
    const listviewsProps = {
        dataSource,
        renderRow,
        onRefresh,
        onEndReached,
        isDashboard: true,
        refreshing: dashboardRefreshing,
        defalutHeight: defalutHeight - 40
    }
    const packModuleList = () => {
        return lists.map((list, index) => {
            const isLast = index === lists.length - 1;
            return (
                <div>
                  <div key={ index } style={ isLast ? {
                                                 marginBottom: "0"
                                             } : {} }>
                    <WhiteSpace size="sm" />
                    <List renderHeader={ () => (
                                             <div className={ styles[`${PrefixCls}-head-title`] } onClick={ handleNeedRefreshing }>
                                               <Link to={ `/typequery?moduleId=${list.id}` }>
                                                 <img src={ list.icon } />
                                                 <span className={ styles[`${PrefixCls}-list-header`] }>{ list.text }</span>
                                                 <span className={ styles[`${PrefixCls}-list-more`] }>更多 <Icon type={ getLocalIcon("/page/more.svg") }/></span>
                                               </Link>
                                             </div>
                                         ) }>
                    </List>
                    { /*{ isLast && <WhiteSpace size="sm" /> }*/ }
                  </div>
                </div>
            )
        })
    };
    const headerProps = {
        dispatch,
        rightContent: {
            dot: hasNews,
            icon: "/header/news.svg",
            //to: "/mylist?title=我的新消息&moduleId=0&types=1",
            onClick: () => {
                dispatch(routerRedux.push({
                    pathname: "/mylist",
                    query: {
                        moduleId: 0,
                        types: 1,
                        title: "我的新消息"
                    }
                }));
            }
        }
    };
    return (
        <div>
          <Headersearch {...headerProps}/>
          <div className={ styles[`${PrefixCls}-normal`] }>
            <Grid itemStyle={ { borderRadius: '20px' } }
              data={ modules }
              columnNum={ 4 }
              hasLine={ false }
              onClick={ (_, index) => {
                            handleGirdClick(_.id);
                        } } />
            <HotWords hotwords={ hotWords } handleOnClick={ handleNeedRefreshing } hotWordModuleId={ hotWordModuleId } />
            <WhiteSpace size="sm" />
            <div className={ styles[`${PrefixCls}-noticebar-container`] }>
              <NoticeBar onClick={ handleNoticeClick }
                mode="link"
                icon={ <Icon type={ getLocalIcon("/page/notes.svg") } /> }
                marqueeProps={ { loop: true, style: { padding: '0 0.15rem' } } }>
                { notes.title }
              </NoticeBar>
              <Modal visible={ isModalShow }
                transparent
                maskClosable={ false }
                title="公告"
                footer={ [{ text: '关闭', onPress: () => { handleNoticeClick() } }] }
                wrapProps={ { onTouchStart: onWrapTouchStart } }>
                <div style={ { height: 240, overflowY: 'scroll' } }>
                  <div className={ styles[`${PrefixCls}-noticebar-modal-box`] }>
                    <div className={ styles[`${PrefixCls}-noticebar-modal-box-text`] }>
                      { notes.title }
                    </div>
                    <div className={ styles[`${PrefixCls}-noticebar-modal-box-info`] }>
                      <p>
                        { `${notes.author}-${notes.date}` }
                      </p>
                    </div>
                  </div>
                </div>
              </Modal>
              <div className={ styles[`${PrefixCls}-noticebar-container-btn`] } onClick={ handleNeedRefreshing }>
                <Link to={ `/typequery?moduleId=${noteModuleId}` }>
                  <Icon type={ getLocalIcon('./page/more.svg') } />
                </Link>
              </div>
            </div>
            { packModuleList() }
          </div>
          <ListViews {...listviewsProps}/>
        </div>
        );
}
Dashboard.propTypes = {
    dashboard: PropTypes.object,
    loading: PropTypes.object,
}

export default connect(({dashboard, loading}) => ({
    dashboard,
    loading
}))(Dashboard)

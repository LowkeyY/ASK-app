import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs'
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Card, WingBlank, WhiteSpace, Grid, NavBar, Icon, SearchBar, Button, List, NoticeBar, Badge,Modal } from 'antd-mobile';
import { Layout } from 'components'
import styles from './index.less';
import HotWords from '../hotwords/index';
import { getLocalIcon} from 'utils'

const Item = List.Item;
const Brief = Item.Brief;

function Dashboard({dashboard, loading, dispatch}) {
    const {Headersearch, BaseLine} = Layout,
        PrefixCls = "dashboard",
        {hasNews, modules, lists, notes, hotWords , isModalShow} = dashboard;

    const handleGirdClick = (moduleId) => {
            //跳转时，开启分类检索页面刷新。
            dispatch({
                type: "typequery/updateState",
                payload: {
                    refreshing: true
                }
            });
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
                    id:pageId
                }
            }));
        },
        handleHotWordChlick = (moduleId, pageId) => {
            dispatch(routerRedux.push({
                pathname: "/typequery",
                query: {
                    moduleId,
                    lists: pageId
                }
            }));
        },
      showNotice = (e) => {
    e.preventDefault();
    dispatch({
      type: 'dashboard/updateState', payload: {isModalShow: true}
    })
  },
      onClose = () => {
    dispatch({
      type: 'dashboard/updateState', payload: {isModalShow: false}
    })
  },
      goNoticeDetail=(moduleId)=>{
        dispatch(routerRedux.push({
          pathname: "/typequery",
          query: {
            moduleId
          }
        }));
      }
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
  const goList =(moduleId)=>{
    dispatch(routerRedux.push(
      {
        pathname: "/typequery",
        query: {
          moduleId
        }
      }));
  };
    const packModuleList = () => {
        return lists.map((list, index) => {
            const isLast = index === lists.length - 1;
            return (
                <div style={ isLast ? {
                 marginBottom: ".1rem"
             } : {} }>
                  <WhiteSpace size="sm" />
                  <List renderHeader={ () => (<div className={ styles[`${PrefixCls}-head-title`] }>
                                                <img src={ list.icon } />
                    <span className={ styles[`${PrefixCls}-list-header`] }>{ list.text }</span>
                    <span
                      onTouchStart={goList.bind(this,list.id)}
                      className={styles[`${PrefixCls}-list-more`]}>更多
                      <Icon type={getLocalIcon("/page/更多.svg")}/>
                    </span>
                                              </div>) }>
                    { list.items && list.items.map((item, index) => {
                          let isNew = item.isNew === true;
                          let result = (
                          <Item
                                arrow="horizontal"
                                multipleLine
                                onClick={ handleListItemClick.bind(null, list.id, item.id) }
                                key={ `${lists.id}-${index}` }
                                wrap>
                            <span className={ styles[`${PrefixCls}-list-body`] + " " + (isNew ? styles[`${PrefixCls}-list-isNew`] : "") }>{ item.title }</span>
                            <Brief>
                              { `${item.author} - (${item.date})` }
                            </Brief>
                          </Item>
                          );

                          return !isNew ? result :
                              <Badge key={ `badge-${index}` } text={ '新' } corner>
                                { result }
                              </Badge>
                      }) }
                  </List>
                  { isLast && <WhiteSpace size="sm" /> }
                </div>
            )
        })
    };

    const headerProps = {
        dispatch,
        rightContent: {
            icon: "/header/news.svg",
            to: "/mylist"
        }
    };
    return (
        <div>
          <Headersearch {...headerProps}/>
          <div className={ styles[`${PrefixCls}-normal`] }>
            <Grid
                  itemStyle={{borderRadius:'20px'}}
                  data={ modules }
                  columnNum={ 4 }
                  hasLine={ false }
                  onClick={ (_, index) => {
                                handleGirdClick(_.id);
                            } } />
            <HotWords hotwords={ hotWords } dispatch={ dispatch } handleHotWordChlick={ handleHotWordChlick } />
            <WhiteSpace size="sm" />
            <div className={styles[`${PrefixCls}-noticebar-container`]}>
              <NoticeBar
                onClick={showNotice}
                mode="link" icon={<Icon type={getLocalIcon("/page/notes.svg")}/>}
                marqueeProps={{loop: true, style: {padding: '0 0.15rem'}}}>
                  {notes.title}
              </NoticeBar>
              <Modal
                visible={isModalShow}
                transparent
                maskClosable={false}
                title="公告"
                footer={[{
                  text: '关闭', onPress: () => {
                    onClose()
                  }
                }]}
                wrapProps={{onTouchStart: onWrapTouchStart}}
              >
                <div style={{height: 200, overflowY: 'scroll'}}>
                  <div className={styles[`${PrefixCls}-noticebar-modal-box`]}>
                    <div className={styles[`${PrefixCls}-noticebar-modal-box-text`]}>
                      {notes.title}
                    </div>
                    <div className={styles[`${PrefixCls}-noticebar-modal-box-info`]}>
                      <p>{`${notes.author}-${notes.date}`}</p>
                    </div>
                  </div>
                </div>
              </Modal>
              <div
                onTouchEnd={goNoticeDetail.bind(null,"6")}
                className={styles[`${PrefixCls}-noticebar-container-btn`]}>
                <Icon type={getLocalIcon('./page/more.svg')}/>
              </div>
            </div>
            { packModuleList() }
            <BaseLine />
          </div>
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

import Header from './header';
import PropTypes from 'prop-types';
import Headersearch from './header-search';
import Headertitle from './headertitle';
import { NoticeBar, List, Tag, NavBar, Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils'
import { routerRedux } from 'dva/router';
import markImage from 'themes/images/watermark.png';
import { emptyFunc } from 'utils'
import './index.less';

const PrefixCls = "page-content";

module.exports = {
    Header,
    Headersearch,
    Headertitle,
    BaseLine: () => (
        <div className={ `${PrefixCls}-baseline` }>
          <div className={ "infos" }>
            <span>没有更多内容了</span>
          </div>
        </div>
    ),
    Filterview: ({values = [], onClick = emptyFunc, lager = true}) => {
        const Cls = "list-filter",
            maxWordLength = lager ? 8 : 12;
        let index = 1;
        return (
            <List className={ Cls }>
              <List.Item onClick={ onClick } wrap>
                { values.map(_ => <Tag key={ `filter-tag-${index++}` }>
                                    { _.length > maxWordLength ? _.substr(0, maxWordLength - 1) + ".." : _ }
                                  </Tag>) }
              </List.Item>
            </List>
        )
    },
    Warnings: ({warnWords = "此文件仅作为公司内部使用，使用人应承担保密义务，如因违反规定而造成公司保密文件外泄情况发生,使用人应承担一切损失与后果。"}) => (
        <List className={ `${PrefixCls}-warnings` }>
          <List.Item>
            <NoticeBar marqueeProps={ { loop: true, style: { color: 'red', background: '#fff' } } }>
              { warnWords }
            </NoticeBar>
          </List.Item>
        </List>
    ),
    WaterMark: () => (
        <div className={ `${PrefixCls}-watermark` }>
          <img src={ markImage } />
        </div>
    ),
  Nav: (props) => {
    let title;
    const isisCollect=props.isCollect,
      getTitle=(moduleId)=>{
        switch (moduleId){
          case '4' : return title='帖子详情';
          case '1' : return title='案例详情';
          case '2': return title='文库详情';
          default: return title='';


        }
      }
    const goBack = () => {
      props.dispatch(routerRedux.goBack())
    }

    const del =()=>{
      alert()
    }
    return (
      <div className={`${PrefixCls}-head-box`}>
        <div className={ `${PrefixCls}-nav` }>
          <NavBar mode="light"
                  leftContent="返回"
                  onLeftClick={goBack}
                  rightContent={
                    props.moduleId==="4"
                      ?
                      [<p onTouchEnd={del}>删除</p>]
                      :
                      [<Tag selected={isisCollect}><Icon type={getLocalIcon('/page/collection.svg')}/>
                        {
                          isisCollect
                            ?
                            <span className={`${PrefixCls}-collection`}>已收藏</span>
                            : <span className={`${PrefixCls}-collection`}>收藏</span>
                        }
                      </Tag>]
                  }

          >
            <p className={ `${PrefixCls}-nav-title` }>
              { getTitle(props.moduleId)}
            </p>
          </NavBar>
        </div>
      </div>
    )
    Nav.propTypes = {
      dispatch: PropTypes.func.isRequired,
      moduleId:PropTypes.number.isRequired
    };
  }
};


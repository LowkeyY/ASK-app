import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { NavBar, Button, WhiteSpace, WingBlank, SegmentedControl, Table ,List} from 'antd-mobile'
import Discuss from './components/discuss'
import styles from './index.less'
import image from './img/watermark.png'
function PageContent ({
  location, pagecontent, loading, dispatch,
}) {
  const { currentPage: { content, infos, title, comments, imgs }, currentSelected } = pagecontent
  const { query: { froms = '/' } } = location,
    PrefixCls = 'pagecontent',
    Item = List.Item;
  const discussData=[
    {
      id:0,
      name:"采姑娘的小蘑菇",
      discuss:'听这个版本的时候，我吃着一碗水饺，然后，听着听着想啊想啊，泪哗哗的下啊下啊下啊下啊下啊下啊，在碗里，苦咸。那年，我三十八岁',
      time:'2017年10月22日'
    }, {
      id:1,
      name:"青铜门外花骨千年",
      discuss:'我于杀戮之中绽放，亦如黎明中的花朵。切随疾风前行，身后已是流星。让我们来猎杀那些陷入黑暗中的人吧。一点寒芒先到，随后枪出如龙。控制敌人，掌控自己。幸运女神在微笑。生与死，轮回不止，我们生，他们死。黑玫瑰将再次绽放。再见了LOL，我们的青春如同红旗般飘扬！',
      time:'2016年4月22日'
    }, {
      id:2,
      name:"-愿你永远穿漂亮衣服",
      discuss:'想起了陪伴了我整整两年，带我听民谣的男孩子，因为他才开始喜欢gala，我原来以为我们永远不会失去对方，作为朋友坚不可摧。后来我答应了一个人的追求，当天晚上告诉他的时候直接哭出声，隔天看到他的签名改成了愿你永远穿漂亮衣服，当时没听娜娜。半年后在教室里无意中听到眼泪啪的一下就掉桌子了',
      time:'2015年4月9日'
    }, {
      id:3,
      name:"刘曲奇爱吃曲奇",
      discuss:'终于把关于她一切的东西都删完了，解脱了，她身边已经有更好的人了，我能做的只有祝她幸福了，希望我们就此相别，永不相见，明天我也要好好的了，好好吃饭好好上课了，真我真的放下你了',
      time:'2014年9月30日'
    },

  ];
  const goBack = () => {
      dispatch(routerRedux.goBack())
    },
    handleChange = (e) => {
      dispatch({ type: 'pagecontent/updateState', payload: { currentSelected: e.nativeEvent.selectedSegmentIndex } })
    },
    handleAtt = () => {
      dispatch(routerRedux.push({ pathname: '/pdfcontent' }))
    },
    getContent = (index = 0) => {
      const datas = []
      switch (index) {
        case 0 : {
          let imgIndex = 0;
          content.split('_image_').map((_, index) => {
            if (index % 2 !== 0) { datas.push(<img style={{ maxWidth: '100%' }} src={require('themes/images/page01.jpeg')} />) }
            datas.push(<p>{_}</p>)
          })
          return (<div className={styles[`${PrefixCls}-page`]}>
            {datas}
            <div className={styles[`${PrefixCls}-water-mark`]}>
              <img className={styles[`${PrefixCls}-water-mark-img`]} src={image} alt=""/>
            </div>
          </div>)
        }
        case 1 : {
          const keys = Object.keys(infos)
          keys.map((key, index) => {
            datas.push(<li
              className={index === keys.length - 1 ? styles[`${PrefixCls}-props-last-prop`] : ''}
            >{key}</li>)
            datas.push(<li
              className={index === keys.length - 1 ? styles[`${PrefixCls}-props-last-value`] : styles[`${PrefixCls}-props-value`]}
            >{infos[key]}</li>)
          })
          return (
            <div className={styles[`${PrefixCls}-props`]}>
              <ul>{datas}</ul>
              <WhiteSpace size="xl" />
              <Button type="ghost" inline size="small" onClick={handleAtt} style={{ marginRight: '4px' }}>查看附件</Button>
            </div>
          )
        }
        case 2 : {
          return (
         <div className={styles[`${PrefixCls}-comment`]}>

              {
                discussData.map((item,index)=>{
                    return (
                      <List className="my-list" key={item.id}>
                        <Item align="top" multipleLine wrap>
                          <a href="#" className={styles['discuss-person']}>{`${item.name}：`}</a>
                          <p className={styles['discuss-content']}>{item.discuss}</p>
                          <div>
                            <span className={styles['discuss-time']}>{item.time}</span>
                          </div>
                        </Item>
                      </List>
                    )
                })
              }
            </div>
          )
        }
      }
    }

  return (
    <div>
      <div className={styles[`${PrefixCls}-header`]}>
        <NavBar leftContent="返回"
          mode="light"
          onLeftClick={goBack}
        />
      </div>
      <div className={styles[`${PrefixCls}-normal`]}>
        <WingBlank size="sm">
          <div className={styles[`${PrefixCls}-title`]}>{title}</div>
          <SegmentedControl
            selectedIndex={currentSelected}
            values={['状态监测', '基本属性', '评论']}
            onChange={handleChange}
            style={{ padding: '.2rem' }}
          />
        </WingBlank>
        <WhiteSpace size="md" />
        <WingBlank size="sm">
          {getContent(currentSelected)}
        </WingBlank>
      </div>
    </div>
  )
}

PageContent.propTypes = {
  location: PropTypes.object.isRequired,
  page03: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ pagecontent, loading }) => ({ pagecontent, loading }))(PageContent)

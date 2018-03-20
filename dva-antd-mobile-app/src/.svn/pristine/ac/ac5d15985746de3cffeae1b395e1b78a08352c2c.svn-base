import { List, ListView, Badge, Icon, Button, Accordion, Tag } from 'antd-mobile';
import { getLocalIcon } from './index'

const Item = List.Item,
    Brief = Item.Brief,
    stopPropagation = (e) => {
        e.stopPropagation();
    };

module.exports = {
    _bbsx: (obj, sectionID, rowID, onClick) => (
        <Item
              className={ "row" }
              arrow="horizontal"
              multipleLine
              onClick={ onClick.bind(null, obj.id) }
              key={ `${sectionID} - ${rowID}` }
              wrap>
          <div className={ "title" }>
            <h3>{ obj.title }</h3>
          </div>
          <Brief>
            { `${obj.author} - (${obj.date})` }
          </Brief>
          <div className={ "content" }>
            <div>
              <Icon type={ getLocalIcon("/page/view.svg") } size="xs" />
              <span>{ `${obj.views || "0"}` }</span>
            </div>
            <div>
              <Icon type="info-circle" size="xs" />
              <span>{ `${obj.replys || "0"}` }</span>
            </div>
            <div>
              <Icon type={ getLocalIcon("/page/plate.svg") } size="xs" />
              <span>{ `${obj.plates || "其它"}` }</span>
            </div>
            <div>
              <Icon type={ getLocalIcon("/page/state.svg") } size="xs" />
              <span>{ `${obj.status || "其它"}` }</span>
            </div>
          </div>
        </Item>
    ),
    _case: (obj, sectionID, rowID, onClick, handleTagClick) => (
        <Item
              className={ "row" }
              arrow="horizontal"
              multipleLine
              onClick={ onClick.bind(null, obj.id) }
              key={ `${sectionID} - ${rowID}` }
              wrap>
          <div className={ "title" }>
            <h3>{ obj.title }</h3>
          </div>
          <Brief>
            { `${obj.author} - (${obj.date})` }
          </Brief>
          <div className={ "content" }>
            <div>
              <Icon type="info-circle" size="xs" /><span>{ obj.replys || 0 }</span>
            </div>
            <div>
              <Icon type={ getLocalIcon("/page/view.svg") } size="xs" /><span>{ obj.views || 0 }</span>
            </div>
            <div onClick={ stopPropagation }>
              <Tag onChange={ handleTagClick.bind(null, obj.id) } selected={ obj.isCollect }>
                <Icon type={ getLocalIcon("/page/collection.svg") } size="xs" />
                { obj.isCollect
                  ?
                  <span>已收藏</span>
                  :
                  <span>收藏案例</span> }
              </Tag>
            </div>
          </div>
        </Item>
    ),
    _lore: (obj, sectionID, rowID, onClick, handleTagClick) => (
        <Item
              className={ "row" }
              arrow="horizontal"
              multipleLine
              onClick={ onClick.bind(null, obj.id) }
              key={ `${sectionID} - ${rowID}` }
              wrap>
          <div className={ "title" }>
            <h3>{ obj.title }</h3>
          </div>
          <Brief>
            { `${obj.author} - (${obj.date})` }
          </Brief>
          <div className={ "content" }>
            <div>
              <Icon type="info-circle" size="xs" /><span>{ obj.replys || 0 }</span>
            </div>
            <div>
              <Icon type={ getLocalIcon("/page/download.svg") } size="xs" />
              <span>{ obj.downloads || 0 }</span>
            </div>
            <div onClick={ stopPropagation }>
              <Tag onChange={ handleTagClick.bind(null, obj.id) } selected={ obj.isCollect }>
                <Icon type={ getLocalIcon("/page/collection.svg") } size="xs" />
                { obj.isCollect
                  ?
                  <span>已收藏</span>
                  :
                  <span>收藏文档</span> }
              </Tag>
            </div>
          </div>
        </Item>
    ),
    _equipment: (obj, sectionID, rowID, onClick) => (
        <Item
              className={ "row" }
              arrow="horizontal"
              multipleLine
              onClick={ onClick.bind(null, obj.id) }
              key={ `${sectionID} - ${rowID}` }
              wrap>
          <div className={ "title" }>
            <h3>{ obj.title }</h3>
          </div>
          <Brief>
            { `${obj.author} - (${obj.date})` }
          </Brief>
          <div className={ "info" }>
            <p>
              位置:<span>{ obj.fPath }</span>
            </p>
            <p>
              大小:<span>{ obj.fSize }</span>
            </p>
          </div>
        </Item>
    ),
    _hotword: (obj, sectionID, rowID, onClick) => (
        <Item
              className={ "row" }
              arrow="horizontal"
              multipleLine
              onClick={ onClick.bind(null, obj.id) }
              key={ `${sectionID} - ${rowID}` }
              wrap>
          <div className={ "title" }>
            <h3>{ obj.title }</h3>
          </div>
        </Item>
    ),
    _note: (obj, sectionID, rowID) => (
        <Item className={ "row" } multipleLine key={ `${sectionID} - ${rowID}` } wrap>
          <div className={ "title" }>
            <h3>{ obj.title }</h3>
          </div>
          <Brief>
            { `${obj.author} - (${obj.date})` }
          </Brief>
        </Item>
    ),
    _message: (obj, sectionID, rowID, onClick) => {
        let isNew = obj.flag === "0";
        let result = (
        <Item
              className={ "row" }
              key={ `${sectionID} - ${rowID}` }
              arrow="horizontal"
              multipleLine
              onClick={ onClick.bind(null, obj.id, obj.pageId, obj.message_type) }
              wrap
        >
          <div className={ `title ${isNew ? "news" : ""}` }>
            <h3>{ obj.title }</h3>
          </div>
          <div dangerouslySetInnerHTML={ { __html: obj.content } } />
          <Brief >
            { `(${obj.sendtime})` }
          </Brief>
        </Item>
        );

        return !isNew ? result :
            <Badge key={ `badge - ${sectionID} - ${rowID}` } text={ '新' } corner>
              { result }
            </Badge>
    }
}

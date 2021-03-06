import React from 'react'
import { connect } from 'dva';
import ReactDOM from 'react-dom'
import { List, WhiteSpace, Accordion } from 'antd-mobile';
import ForumAuthor from 'components/forumauthor/index'
import { routerRedux } from 'dva/router';
import { WaterMark, Warnings, BaseLine, Headertitle} from 'components/Layout'
import DiscussFoot from 'components/discussfoot/index'
import CaseContentTitle from 'components/contenttitle/contenttitle'
import styles from './index.less'
import pagestyles from 'themes/content.less'

const Item = List.Item;

function DetailsComponent({dispatch, querycontent, contentProps, app, loading}) {

    const {id, moduleId, currentContent} = contentProps
    const {fpath} = currentContent
    const {userData: {pageFontsize}} = app,
        Prefixcls = 'details-component',
        createMarkup = () => {
            return {
                __html: currentContent.contents
            };
        };
    const handleAtt = () => {
        dispatch(routerRedux.push({
            pathname: '/pdfcontent',
            query: {
                fileUrl: fpath[0].filepath
            }
        }))
    }

    const getCaseFiles = (fpath) => {
        if (fpath && fpath.length > 0) {
            return <div>
                     <WhiteSpace size='sm' />
                     <Accordion className="my-accordion">
                       <Accordion.Panel header="附件">
                         <List>
                           <Item arrow={ fpath[0].filetype === 'pdf' ? "horizontal" : '' } onClick={ fpath[0].filetype === 'pdf' ? handleAtt : null }>
                             { fpath[0].filename }
                           </Item>
                         </List>
                       </Accordion.Panel>
                     </Accordion>
                   </div>
        }
    }
    const getLibraryFiles = (fpath) => {
        if (fpath && fpath.length > 0) {
            return <div>
                     <WhiteSpace size='sm' />
                     <List>
                       <Item arrow={ fpath[0].filetype === 'pdf' ? "horizontal" : '' } onClick={ fpath[0].filetype === 'pdf' ? handleAtt : null }>
                         { fpath[0].filename }
                       </Item>
                     </List>
                   </div>

        }
    }
    const forumdetails = () => {
        return (
            <div>
              <div>
                <List>
                  <Item wrap>
                    <h5 className={ styles[`${Prefixcls}-title`] }>{ currentContent.title }</h5>
                  </Item>
                </List>
                <ForumAuthor {...currentContent}/>
                <DiscussFoot {...currentContent} />
                <Warnings/>
                <div className={ `page-content ${pageFontsize}` } style={ { overflow: 'hidden', background: '#fff' } }>
                  <div dangerouslySetInnerHTML={ createMarkup() } />

                </div>
              </div>
            </div>
        )
    }
    const casedetails = () => (
        <div>
          <div>
            <CaseContentTitle casecontenttitle={ currentContent.title } />
          </div>
          <Warnings/>
          <Accordion className="my-accordion">
            <Accordion.Panel header="案例信息">
              <div className={ styles[`${Prefixcls}-info-box`] }>
              <List>
                <Item extra={ currentContent.organizer } wrap>
                  编制者
                </Item>
                <Item extra={ currentContent.author } wrap>
                  作者
                </Item>
                <Item extra={ currentContent.depts } wrap>
                  部门
                </Item>
                <Item extra={ currentContent.stype } wrap>
                  分系统
                </Item>
                <Item extra={ currentContent.ctype } wrap>
                  所属类型
                </Item>
                <Item extra={ currentContent.mtype } wrap>
                  设备型号
                </Item>
                <Item extra={ currentContent.date } wrap>
                  发布时间
                </Item>
                <Item extra={ currentContent.keywords } wrap>
                  关键索引词
                </Item>
              </List>
              </div>
            </Accordion.Panel>
          </Accordion>
          { getCaseFiles(fpath) }
          <WhiteSpace size='sm' />
          <div className={ `page-content ${pageFontsize}` }  style={ { overflow: 'hidden', background: '#fff' } }>
            <div dangerouslySetInnerHTML={ createMarkup() } />
            <WaterMark/>
          </div>
        </div>
    )


    const librarydetails = () => {
        return (
            <div>
              <CaseContentTitle casecontenttitle={ currentContent.title } />
              <Warnings/>
              <div className={ styles[`${Prefixcls}-info-box`] }>
              <List>
                <Item extra={ currentContent.author } wrap>
                  编制者
                </Item>
                <Item extra={ currentContent.depts } wrap>
                  部门
                </Item>
                <Item extra={ currentContent.ltype } wrap>
                  所属类型
                </Item>
                <Item extra={ currentContent.date } wrap>
                  发布时间
                </Item>
                <Item extra={ currentContent.keywords } wrap>
                  关键索引词
                </Item>
              </List>
              </div>
              <List>
                { getLibraryFiles(fpath) }
              </List>
            </div>
        )
    }
    const renderComponent = () => {

        switch (moduleId) {
        case "4":
            return forumdetails();
        case "1":
            return casedetails();
        case "2":
            return librarydetails();

        default:
            return <div style={ { display: "none" } }></div>;
        }
    }
    return (
    renderComponent()
    )

}

export default connect(({querycontent, app, loading}) => ({
    querycontent,
    app,
    loading
}))(DetailsComponent);

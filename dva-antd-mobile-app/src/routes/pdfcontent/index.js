import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, SearchBar, Button, WhiteSpace, WingBlank, Slider, Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils'
import { Document, Page, setOptions } from 'react-pdf/build/entry.webpack';
import styles from './index.less'

setOptions({
    cMapUrl: 'cmaps/',
    cMapPacked: true,
});

function pdfcontent({location, pdfcontent, loading, dispatch}) {

    let {fileUrl = "http://192.168.0.119:8001/sample/testPdf.jcp", pdfProps = {}, numPages, scale, isShowScale} = pdfcontent;
    fileUrl = "https://ask.nuctech.com/ueditor/jsp/upload/file/20170614/%E5%8F%8C%E5%90%91%E6%B6%B2%E5%8E%8B%E9%94%81%E5%92%8C%E5%B9%B3%E8%A1%A1%E9%98%80%E7%9A%84%E5%8C%BA%E5%88%AB1497411472433034917.pdf";
    const goBack = () => {
            dispatch(routerRedux.goBack())
        },
        loadSuccess = (pdf) => {
            dispatch({
                type: "pdfcontent/updateState",
                payload: {
                    numPages: pdf.numPages
                }
            });
            console.log("loadSuccess", arguments);
    }
    const onScale = (num) => {
        dispatch({
            type: 'pdfcontent/updateState',
            payload: {
                scale: num
            }
        })
        setTimeout(function() {
            dispatch({
                type: 'pdfcontent/updateState',
                payload: {
                    isShowScale: false
                }
            })
        }, 3000)
    }
    const ShowScale = () => {
        dispatch({
            type: 'pdfcontent/updateState',
            payload: {
                isShowScale: !isShowScale
            }
        })
    }
    const PrefixCls = "pdfcontent";

    const finalProps = {
        ...pdfProps,
        onLoadSuccess: loadSuccess,
        onParseError: (e) => {
            console.log("onParseError", e)
        },
        onParseSuccess: () => {
            console.log("onParseSuccess", e)
        }
    }
    let index = 0;

    return (
        <div>
          <div className={ styles[`${PrefixCls}-header`] }>
            <NavBar leftContent="返回" mode="light" onLeftClick={ goBack }></NavBar>
            <div className={ styles[`${PrefixCls}-silder-box`] } style={ { display: isShowScale ? 'block' : 'none' } }>
              <div className={ styles[`${PrefixCls}-font-small`] }>
                <Icon size="xs" type={ getLocalIcon('/page/scaledown.svg') } />
              </div>
              <div className={ styles[`${PrefixCls}-font-big`] }>
                <Icon size="xs" type={ getLocalIcon('/page/scaleup.svg') } />
              </div>
              <Slider
                      style={ { marginLeft: 30, marginRight: 30 } }
                      defaultValue={ 1 }
                      min={ 1 }
                      max={ 2.5 }
                      step={ 0.1 }
                      handleStyle={ { background: '#108ee9', zIndex: '3' } }
                      trackStyle={ { background: '#888' } }
                      onChange={ onScale } />
            </div>
          </div>
          <div className={ styles[`${PrefixCls}-normal`] } onClick={ ShowScale }>
            <WingBlank size="sm">
              <Document file={ fileUrl } {...finalProps}>
                { Array.from(
                      new Array(numPages),
                      (el, index) => (
                          <Page key={ `page_${index + 1}` } pageNumber={ index + 1 } width={ (document.body.clientWidth - 20) * scale } />
                      ),
                  ) }
              </Document>
            </WingBlank>
          </div>
        </div>
        );
}

pdfcontent.propTypes = {
    location: PropTypes.object.isRequired,
    testcontent: PropTypes.object,
    loading: PropTypes.object,
};

export default connect(({pdfcontent, loading}) => ({
    pdfcontent,
    loading
}))(pdfcontent);



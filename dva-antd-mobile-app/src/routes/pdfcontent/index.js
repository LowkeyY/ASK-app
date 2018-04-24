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

    const {fileUrl = "", pdfProps = {}, numPages, scale} = pdfcontent;
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
    }
    const onScale = (num) => {
        dispatch({
            type: 'pdfcontent/updateState',
            payload: {
                scale: num
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
            <div className={ styles[`${PrefixCls}-silder-box`] }>
              <div className={ styles[`${PrefixCls}-font-small`] }>
                <Icon size="md" type={ getLocalIcon('/page/scaledown.svg') } />
              </div>
              <div className={ styles[`${PrefixCls}-font-big`] }>
                <Icon size="md" type={ getLocalIcon('/page/scaleup.svg') } />
              </div>
              <Slider style={ { marginLeft: 30, marginRight: 30 } }
                defaultValue={ scale }
                min={ 1 }
                max={ 2.5 }
                step={ 0.5 }
                handleStyle={ { background: '#108ee9', zIndex: '3' } }
                trackStyle={ { background: '#888' } }
                onChange={ onScale } />
            </div>
          </div>
          <div className={ styles[`${PrefixCls}-normal`] }>
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



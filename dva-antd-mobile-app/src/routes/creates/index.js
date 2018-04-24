import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import BbsEdit from 'components/bbsedit';
import { NavBar, Popover, Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils'
import styles from './index.less';

const Item = Popover.Item;

function Creates({location, creates, loading, dispatch}) {
    const {plates, showSelectMenu, currentTechs, currentParams, editorState, animating, emailControl, draftId, draftContents , draftCompleted} = creates,
        PrefixCls = "creates";
    const update = (params) => {
            const {isShow = null, ...param} = params;
            dispatch({
                type: 'creates/updateParam',
                payload: {
                    showSelectMenu: isShow == null ? !showSelectMenu : isShow,
                    currentParams: {
                        ...currentParams,
                        ...param
                    }
                }
            })
        },
        plateOnChange = (others = {}) => {
            dispatch({
                type: 'creates/changePlates',
                payload: {
                    showSelectMenu: !showSelectMenu,
                    ...others
                }
            })
        },
        othersOnChange = (others = {}) => {
            dispatch({
                type: 'creates/updateState',
                payload: {
                    showSelectMenu: !showSelectMenu,
                    currentParams: {
                        ...currentParams,
                        ...others
                    }
                }
            })
        },
        titleOnChange = (value) => {
            dispatch({
                type: 'creates/updateState',
                payload: {
                    currentParams: {
                        ...currentParams,
                        theTitle: value

                    }
                }
            })
        },
        handleUserSearchClick = () => {
            dispatch(routerRedux.push({
                pathname: "/searchuser",
                query: {
                    tragetState: "creates"
                }
            }));
        },
        onFormSubmit = (params) => {
            dispatch({
                type: 'creates/submit',
                payload: {
                    params
                }
            })
        },
        showAnimating = () => {
            dispatch({
                type: 'creates/updateState',
                payload: {
                    animating: true
                }
            })
        },
        onSubmitDraft = (params) => {
            dispatch({
                type: 'creates/submitDraft',
                payload: {
                    params
                }
            })
        },
        handleLoadDraft = (editorState = "") => {
            dispatch({
                type: 'creates/loadDraft',
                payload: {
                    isLoad: editorState != "",
                    editorState
                }
            })
        };

    const props = {
        dispatch,
        plates,
        currentTechs,
        showSelectMenu,
        othersOnChange,
        handleOK: plateOnChange,
        handleUserSearchClick,
        currentParams,
        editorState,
        titleOnChange,
        onFormSubmit,
        animating,
        showAnimating,
        emailControl,
        onSubmitDraft,
        draftId,
        draftContents,
        handleLoadDraft,
        draftCompleted
    }

    return (
        <div>
          <div className={ styles[`${PrefixCls}-normal`] }>
            <BbsEdit {...props}/>
          </div>
        </div>

        );
}

Creates.propTypes = {
    test: PropTypes.object,
    loading: PropTypes.object,
}

export default connect(({creates, loading}) => ({
    creates,
    loading
}))(Creates)

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { SearchBar, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { searchStyles } from './index.less';
import Filters from './filters'
import Results from './results'

const PrefixCls = "page-search";
const getFilterValue = (obj) => {
    const newObj = {};
    Object.keys(obj).map(att => {
        newObj[att] = obj[att].value
    })
    return {
        ...newObj
    };
};


function Search({search, loading, dispatch}) {

    const {modules, moduleMenu, isSearch, currentModuleId, currentFilter, textQuery, resultProps, filterProps} = search;

    const update = (payload = {}) => {
            dispatch({
                type: "search/updateState",
                payload
            })
        },
        updateFilter = (payload = {}) => {
            dispatch({
                type: "search/updateFilter",
                payload
            })
        },
        updateResult = (payload = {}) => {
            dispatch({
                type: "search/updateResult",
                payload
            })
        },
        goBack = () => {
            dispatch(routerRedux.goBack());
        },
        goResults = (payload = {}) => {
            update({
                isSearch: true,
                ...payload
            });
        },
        goFilter = () => {
            update({
                isSearch: false
            });
        },
        doSearch = (payload = {}) => {
            dispatch({
                type: "search/search",
                payload: {
                    moduleId: currentModuleId,
                    textQuery,
                    ...getFilterValue(currentFilter),
                    start: resultProps.pageIndex,
                }
            })
        },
        onSubmit = () => {
            //提交搜索时，先清空已搜索结果
            goResults({
                filterProps: {
                    ...filterProps,
                    isShow: false
                }
            });
            resetResult();
            doSearch();
        },
        goPage = (payload = {}) => {
            dispatch(routerRedux.push({
                pathname: "/details",
                query: {
                    moduleId: currentModuleId,
                    ...payload
                }
            }))
        },
        resetResult = (payload = {}) => {
            dispatch({
                type: "search/resetResult",
                payload
            })
        };

    const globalProps = {
        currentModuleId,
        currentFilter,
        textQuery,
        updateState: update,
        goBack: goBack,
        resetResult,
    }

    const getProps = () => {
        return isSearch ? {
            //搜索结果
            ...globalProps,
            resultProps,
            update: updateResult,
            onSubmit: doSearch,
            goPage: goPage,
            goFilter: goFilter,
        } : {
            //过滤条件
            ...globalProps,
            modules,
            moduleMenu,
            onSubmit: onSubmit,
            filterProps,
            update: updateFilter
        }
    }

    return (
        <div>
          { isSearch ? <Results {...getProps()} /> : <Filters {...getProps()}/> }
        </div>
        );
}

Search.propTypes = {
    search: PropTypes.object.isRequired,
    loading: PropTypes.object,
};

export default connect(({search, loading}) => ({
    search,
    loading
}))(Search);
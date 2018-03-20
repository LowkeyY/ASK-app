import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { SearchBar, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { searchStyles } from './index.less';
import Filters from './filters'
import Results from './results'

const PrefixCls = "page-search",
    fromModal = "search",
    getFilterValue = (obj) => {
        const newObj = {};
        Object.keys(obj).map(att => {
            const value = obj[att];
            newObj[att] = Array.isArray(value) ? value[0].value : value.value
        })
      console.log(newObj)
        return {
            ...newObj
        };
    };


function Search({search, loading, dispatch}) {
    const {modules, moduleMenu, isSearch, currentModuleId, currentFilter, textQuery, resultProps, filterProps, defalutHeight} = search,
  {dpValue}=filterProps
    const handleNeedRefreshing = () => {
        //跳转时，开启分类检索页面刷新。
        dispatch({
            type: "typequery/updateState",
            payload: {
                refreshing: true
            }
        });
    };
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
                    ...payload
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
            doSearch({
                start: 0
            });
        },
        goPage = (id) => {
            dispatch(routerRedux.push({
                pathname: "/details",
                query: {
                    moduleId: currentModuleId,
                    fromModal,
                    id
                }
            }))
        },
        goPdf = (id) => {
            dispatch(routerRedux.push({
                pathname: "/pdfcontent",
                query: {
                    moduleId: currentModuleId,
                    id
                }
            }))
        },
        goHotWords = (id) => {
            handleNeedRefreshing()
            dispatch(routerRedux.push({
                pathname: "/hotwordsresult",
                query: {
                    moduleId: currentModuleId,
                    lists: id
                }
            }))
          dispatch({
            type: "hotwordsresult/query",
            payload:{
              moduleId: currentModuleId,
              lists: id
            }
          })
        },
        resetResult = (payload = {}) => {
            dispatch({
                type: "search/resetResult",
                payload
            })
        },
        searchUser = (tragetStateKey = "") => {
            dispatch(routerRedux.push({
                pathname: "/searchuser",
                query: {
                    tragetState: "search",
                    isSingle: true,
                    tragetStateKey
                }
            }));
        },
        collect = (id, isCollect) => {
            dispatch({
                type: 'search/collect',
                payload: {
                    value: isCollect ? 1 : 0,
                    id: id
                }
            })
        },

      getStartDate=(v)=>{
          dispatch({
            type:"search/updateFilter",
            payload:{
              startDate:v
            }
          })

        },
      getEndDate=(v)=>{
        dispatch({
          type:"search/updateFilter",
          payload:{
            endDate:v
          }
        })
      },
      resetDate=(e)=>{
    e.stopPropagation();
    dispatch({
      type:"search/updateFilter",
      payload:{
        startDate:null,
        endDate:null
      }
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
            goPdf: goPdf,
            collect,
            goHotWords: goHotWords,
            goFilter: goFilter,
            defalutHeight,
        } : {
            //过滤条件
            ...globalProps,
            modules,
            moduleMenu,
            onSubmit: onSubmit,
            filterProps,
            update: updateFilter,
            searchUser,
            getStartDate,
            getEndDate,
            resetDate
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

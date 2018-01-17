/* global window */
import modelExtend from 'dva-model-extend'
import { query } from 'services/querys'
import {createbbsx} from 'services/querycontent'
import { pageModel } from './common'
import {EditorState} from 'draft-js'
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

const getDefaultTech = (techs, key) => {
        return key
            && techs.hasOwnProperty(key)
            && Array.isArray(techs[key])
            && techs[key].length && techs[key][0].value || "";
    },
    getDefaultParams = () => {
        const pa = {
            theTitle: "",
            theTechs: [],
            theUsers: [],
            thePlate: "",
            theContents: ""
        };
        return pa;
    };

export default modelExtend(pageModel, {
    namespace: 'creates',

    state: {
        defaultPlate: "",
        plates: [],
        techs: {},
        currentTechs: [],
        currentParams: getDefaultParams(),
        editorState:EditorState.createEmpty(),
        showSelectMenu: false,
        preivewPlate:''
    },
    subscriptions: {
        setup({dispatch, history}) {
            dispatch({
                type: 'query',
            })
            history.listen(({pathname, query, action}) => {
                if (pathname === '/creates') {
                    if (action === "PUSH") {
                        dispatch({
                            type: 'updateState',
                            payload: {
                                currentParams: getDefaultParams(),
                                showSelectMenu: false,
                              editorState:EditorState.createEmpty()//清空editor
                            }
                        });
                        dispatch({
                            type: 'query',
                        })
                    }
                }
            })
        },
    },

    effects: {
        * query({payload, }, {call, put, select}) {
            const data = yield call(query);
            if (data) {
                const {plates, techs, defaultPlate = "1"} = data;
                const {creates : {currentParams, currentTechs}, typequery = {
                        filterSelected: {
                            plates: ""
                        }
                    }} = yield select(state => state);
                yield put({
                    type: 'updateState',
                    payload: {
                        plates,
                        techs,
                        defaultPlate
                    }
                });
                yield put({
                    type: 'changePlates',
                    payload: {
                        selectPlate: typequery.filterSelected.plates || defaultPlate
                    },
                });
            }
        },
      *createbbsx({payload},{call,put,select}){
          const data =yield call(createbbsx,{
            ...payload
          })
        if(data){
          yield put(routerRedux.push({
            pathname: "/"
          }));
        Toast.success('发帖成功', 2);
        }

      }
    },
    reducers: {
        changePlates(state, {payload}) {
            let {selectPlate = "", ...props} = payload,
                {techs = [], defaultPlate, currentParams, currentTechs} = state,
                others = {};
            selectPlate = selectPlate && selectPlate != "0" ? selectPlate : defaultPlate;
            currentTechs = techs[selectPlate];
            currentParams.thePlate = selectPlate;
            currentParams.theTechs = [getDefaultTech(techs, selectPlate)];
            return {
                ...state,
                ...props,
                currentTechs,
                currentParams
            }
        },
        updateUser(state, {payload = {}}) {
            const {selectedUsers = []} = payload,
                {currentParams} = state;
            return {
                ...state,
                currentParams: {
                    ...currentParams,
                    theUsers: selectedUsers
                }
            }
        },
    }
})

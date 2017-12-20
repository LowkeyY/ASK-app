/* global window */
import modelExtend from 'dva-model-extend'
import { query } from 'services/querys'
import { pageModel } from './common'

const getDefaultTech = (techs, key) => {
  return key
    && techs.hasOwnProperty(key)
    && Array.isArray(techs[key])
    && techs[key].length && techs[key][0].value || "";
};

export default modelExtend(pageModel, {
  namespace: 'creates',

  state: {
    defaultPlate: "",
    plates: [],
    techs: {},
    currentTechs: [],
    selectTechs: [],
    selectedUsers: [],
    selectPlate: "",
    showSelectMenu: false,
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({
        type: 'query',
      })
      history.listen(({pathname, query, action}) => {
        if (pathname === '/creates') {
          dispatch({
            type: 'updateState',
            payload: {
              showSelectMenu: false
            }
          });
          if (action === "PUSH") {
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
        yield put({
          type: 'updateState',
          payload: {
            plates,
            techs,
            defaultPlate
          }
        });
        const {typequery = {
          filterSelected: {
            plates: ""
          }
        }} = yield select(state => state);
        yield put({
          type: 'changePlates',
          payload: {
            selectPlate: typequery.filterSelected.plates
          },
        })
      }
    }
  },
  reducers: {
    changePlates(state, {payload}) {
      let {selectPlate = "", ...props} = payload;
      const {techs = [], defaultPlate} = state,
        others = {};
      if (!selectPlate || selectPlate == "0")
        selectPlate = defaultPlate
      others.selectPlate = selectPlate;
      others.currentTechs = techs[selectPlate];
      others.selectTechs = [getDefaultTech(techs, selectPlate)];
      return {
        ...state,
        ...others,
        ...props
      }
    },
  }
})

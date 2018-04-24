/* global window */
import modelExtend from 'dva-model-extend'
import { query, submits, submitDraft } from 'services/querys'
import { pageModel } from './common'
import { EditorState } from 'draft-js'
import { routerRedux } from 'dva/router'
import { Toast } from 'antd-mobile'
import { convertToRaw } from 'draft-js'

const getDefaultTech = (techs, key) => {
    return key
      && techs.hasOwnProperty(key)
      && Array.isArray(techs[key])
      && techs[key].length && techs[key][0].value || ''
  },
  getDefaultParams = () => {
    const pa = {
      theTitle: '',
      theTechs: [],
      theUsers: [],
      thePlate: '',
      theContents: '',
    }
    return pa
  },
  getEntityParamFiles = (editorState = '') => {
    const entityParam = {}
    if (editorState) {
      const { entityMap } = convertToRaw(editorState.getCurrentContent())
      Object.keys(entityMap)
        .map(key => {
          const entity = entityMap[key]
          if (entity && entity.data && entity.data.data) {
            entityParam[entity.data.src.replace(/[^a-z0-9-]/g, '')] = entity.data.data
          }
        })
    }
    return entityParam
  }

export default modelExtend(pageModel, {
  namespace: 'creates',

  state: {
    defaultPlate: '',
    plates: [],
    techs: {},
    currentTechs: [],
    currentParams: getDefaultParams(),
    editorState: EditorState.createEmpty(),
    showSelectMenu: false,
    preivewPlate: '',
    files: {},
    animating: false,
    emailControl: true,
    draftId: '',
    draftTitle: '',
    draftContents: '',
    draftCompleted: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      let isFrist = true
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/creates') {
          if (action === 'PUSH' || isFrist) {
            isFrist = false
            dispatch({
              type: 'updateState',
              payload: {
                currentParams: getDefaultParams(),
                showSelectMenu: false,
                editorState: EditorState.createEmpty(), //清空editor
                draftId: '',
                draftTitle: '',
                draftContents: '',
              },
            })
            dispatch({
              type: 'query',
            })
          }
        }
      })
    },
  },

  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(query)
      if (data) {
        const { plates, techs, defaultPlate = '8', draftId = '', draftTitle = '', draftContents = '' } = data
        const {
          creates: { currentParams, currentTechs }, typequery = {
            filterSelected: {
              plates: '',
            },
          },
        } = yield select(state => state)
        yield put({
          type: 'updateState',
          payload: {
            plates,
            techs,
            defaultPlate,
            draftId,
            draftTitle,
            draftContents,
            draftCompleted: false,
          },
        })
        yield put({
          type: 'changePlates',
          payload: {
            selectPlate: typequery.filterSelected.plates || defaultPlate,
          },
        })
      }
    },

    * submit ({ payload }, { call, put, select }) {
      const { editorState, draftId } = yield select(state => state.creates)
      const { params : {fromPreview = false , ...param }} = payload,
        entityParam = getEntityParamFiles(editorState)
      const data = yield call(submits, { ...param, draftId }, entityParam)
      if (data && data.success !== false) {
        yield put({
          type: 'typequery/updateState',
          payload: {
            refreshing: true,
          },
        })
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        })
        yield put(fromPreview === true ? routerRedux.go(-2) : routerRedux.goBack())
        Toast.success('发帖成功', 2)
      }
      if (data.success === false) {
        Toast.offline(data.message)
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        })
      }
    },
    * submitDraft ({ payload }, { call, put , select}) {
      const { editorState, draftId } = yield select(state => state.creates)
      const { params } = payload,
        entityParam = getEntityParamFiles(editorState)
      const data = yield call(submitDraft, params, entityParam)
      if (data) {
        yield put(routerRedux.goBack('/dashboard'))
        Toast.success('保存草稿成功', 1)
      }
    },
  },
  reducers: {
    changePlates (state, { payload }) {
      let { selectPlate = '', ...props } = payload,
        { techs = [], defaultPlate, currentParams, currentTechs } = state,
        others = {}
      selectPlate = selectPlate && selectPlate != '0' ? selectPlate : defaultPlate
      currentTechs = techs[selectPlate]
      currentParams.thePlate = selectPlate
      currentParams.theTechs = [getDefaultTech(techs, selectPlate)]
      return {
        ...state,
        ...props,
        currentTechs,
        currentParams,
      }
    },
    updateUser (state, { payload = {} }) {
      const { selectedUsers = [] } = payload,
        { currentParams } = state
      return {
        ...state,
        currentParams: {
          ...currentParams,
          theUsers: selectedUsers,
        },
      }
    },
    loadDraft (state, { payload = {} }) {
      const { draftId, draftTitle, draftContents, currentParams } = state,
        { editorState, isLoad } = payload
      return isLoad ? {
        ...state,
        currentParams: {
          ...currentParams,
          theTitle: draftTitle,
        },
        editorState: editorState,
        draftCompleted: true,
      } : {
        ...state,
        draftId: '',
        draftCompleted: true,
      }
    },
  },
})

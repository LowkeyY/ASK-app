/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { queryPdf } from '../services/querys'
import { config } from 'utils'
import { Loader } from 'components'
import PdfError from 'components/pdferror'
import { _cg } from 'utils/cookie'
const {api : {querypdfApi}, baseURL, notRedirectSign, accessToken } = config

export default modelExtend(pageModel, {
    namespace: 'pdfcontent',
    state: {
        file: {},
        fileUrl: "",
        numPages: 0,
        scale: 1,
        pdfProps: {
            error: <PdfError text="加载PDF文件失败"/>,
            loading:  <Loader spinning={true} />,
            noData: <PdfError text="未找到pdf文件"/>,
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                let {pathname, query} = location;
                if (pathname.startsWith('/pdfcontent')) {
                    let {fileUrl = "" , id= "" , moduleId = ""} = query;
                    if (fileUrl != "")
                        dispatch({
                            type: 'updateState',
                            payload: {
                                fileUrl
                            }
                        })
                    else if(id != "" && moduleId != ""){
                        dispatch({
                          type: 'updateState',
                          payload: {
                            fileUrl : baseURL + querypdfApi + "?" + accessToken + "=" + _cg(accessToken) + "&" + notRedirectSign + "=true&id=" +id+"&moduleId=" + moduleId
                          }
                        })
                    }
                }
            })
        }
    },
    effects: {
        *updateQuery({payload}, {call, put}) {
            const data = yield call(queryPdf, payload);
            if(data){
              const {fileUrl = ""} = data
              yield put({
                type: 'updateState',
                payload :{
                  fileUrl
                }
              })
            }
        },
    }
})

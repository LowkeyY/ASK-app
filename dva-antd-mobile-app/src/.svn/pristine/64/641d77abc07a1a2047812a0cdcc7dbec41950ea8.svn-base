/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
export default modelExtend(pageModel, {
    namespace: 'fontcontrol',
    state: {
        fontSize: 'normal'
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                let {pathname, query} = location;
                if (pathname.startsWith('/fontcontrol')) {
                    dispatch({
                        type: 'updateState',
                        payload: {
                            ...query
                        }
                    })
                }
            })
        }
    },
})


/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'


export default modelExtend(pageModel, {
  namespace: 'pdfcontent',

  state: {
  	file: {},
  	numPages : 0,
  	pdfProps : {
  		error: '加载PDF文件失败。',
  		loading: 'PDF文件加载中…',
  		noData: '未找到PDF文件。',
  	}
  }
})

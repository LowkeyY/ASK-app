/* global window */
import classnames from 'classnames'
import lodash from 'lodash'
import config from './config'
import request from './request'
import { color } from './theme'
import formsubmit from './formsubmit'
import defaultUserAvatar from "themes/images/user.png"
import { _cs, _cr, _cg } from './cookie'

let userAccessToken = "";

// 连字符转驼峰
String.prototype.hyphenToHump = function() {
return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
})
}

// 驼峰转连字符
String.prototype.humpToHyphen = function() {
return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function(format) {
const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
}
if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
}
for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
}
return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
    return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
    if (!(array instanceof Array)) {
        return null
    }
    const item = array.filter(_ => _[keyAlias] === key)
    if (item.length) {
        return item[0]
    }
    return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
    let data = lodash.cloneDeep(array)
    let result = []
    let hash = {}
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index]
    })

    data.forEach((item) => {
        let hashVP = hash[item[pid]]
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = [])
            hashVP[children].push(item)
        } else {
            result.push(item)
        }
    })
    return result
}

const getLocalIcon = (icon) => {
    const regex = /\/([^\/]+?)\./g;
    let addIconName = [];
    if (icon.startsWith("/") && (addIconName = regex.exec(icon)) && addIconName.length > 1) {
        const addIcon = require(`svg/${icon.substr(1)}`);
        return `#${addIconName[addIconName.length - 1]}`;
    }
    return icon;
}

const getUserAvatar = (path = "") => {
    if (path == "" || !path)
        return defaultUserAvatar;
    return path.startsWith("http://") || path.startsWith("https://") ? path
        : (config.baseURL + (path.startsWith("/") ? "" : "/") + path);
}

const isSameEffect = (min, max) => {
    let isSame = false;
    if (min && max) {
        const keys = Object.keys(min);
        if (keys.length <= Object.keys(max).length) {
            isSame = true;
            keys.map(att => {
                isSame &= max.hasOwnProperty(att) && (min[att] == max[att])
            })
        }
    }
    return isSame;
}

const setLoginIn = ({accessToken, user_name, user_power}) => {
    const now = new Date()
    now.setDate(now.getDate() + 5)
    //_cs('user_session', now.getTime())
    _cs('user_name', user_name)
    //_cs('user_power', user_power)
    _cs(config.accessToken, accessToken)
    userAccessToken = accessToken
    cnSetAlias(user_name , accessToken);
}

const setLoginOut = () => {
    const token = _cg(config.accessToken) , user_name =  _cg("user_name")
    _cr(config.accessToken)
    userAccessToken = ""
    _cr('user_power')
    cnDeleteAlias(user_name , token);
}

const getApiParams = () => {
    const param = {};
    param[`${config.accessToken}`] = _cg(config.accessToken);
    return param;
}

const getUserAvatarError = (el) =>{
  if(el && el.target){
    el.target.src = defaultUserAvatar;
    el.target.onerror=null;
  }
}

module.exports = {
    config,
    request,
    color,
    classnames,
    queryURL,
    queryArray,
    arrayToTree,
    timeStamp: () => (new Date()).getTime(),
    isEmptyObject: (obj) => Object.keys(obj).length === 0,
    emptyFunc: () => {
    },
    isSameEffect,
    getLocalIcon,
    getUserAvatar,
    getUserAvatarError,
    setLoginIn,
    setLoginOut,
    getApiParams,
    formsubmit
}

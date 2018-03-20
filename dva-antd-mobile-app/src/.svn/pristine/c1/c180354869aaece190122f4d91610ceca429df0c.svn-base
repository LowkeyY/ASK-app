import Cookie from 'js-cookie'

export const _cs = (key, value, expire) => {
    Cookie.set(key, value, {
        path: '/',
        expires: 1
    })
}

export const _cr = (key) => {
    Cookie.remove(key, {
        path: '/'
    })
}

export const _cg = (key) => {
    const v = Cookie.get(key);
    return v && v != "undefined" ? v : "";
}

export const _cgj = (key) => (Cookie.getJSON(key) || {})

export default {
    _cs,
    _cr,
    _cg,
    _cgj
}

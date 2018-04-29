export const keyMap = (obj, fn) => Object.keys(obj).map(key => fn(key, obj[key]))
export const keyIter = (obj, fn) => Object.keys(obj).forEach(key => fn(key, obj[key]))

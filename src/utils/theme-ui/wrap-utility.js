import { get } from 'theme-ui'

export const themeGet = (theme, scale, key) => {
  let themeVal = get(theme, `${scale}.${key}`, key)
  if (typeof themeVal === 'string') {
    themeVal = themeVal.replace(/^var\(--(\w+)(.*?), /, '').replace(/\)/, '')
  }
  return themeVal
}

// fn: required >> Function
// defaultScales: required >> String || Array of Strings
// defaultArgs: optional >> Array
// callback: optional >> Function --note: callback is applied to each argument value passed into fn, after the argument's theme value has been retrieved, and has access to 4 values: the retrieved theme value, the theme, the current fn index, and the original array of arguments passed into fn
export const wrapUtility = (fn, defaultScales, defaultArgs = [], callback) => {
  // validate fn
  if (!(fn instanceof Function)) {
    throw new Error('fn must be instanceof Function')
  }
  // validate defaultScales
  if (typeof defaltScales === 'string') {
    defaultScales = [...Array(fn.length)].fill(defaultScales)
  } else if (!Array.isArray(defaultScales)) {
    throw new Error('defaultScales must be either a string or an array')
  } else if (defaultScales.some(element => typeof element !== 'string')) {
    throw new Error('each element of defaultScales array must be a string')
  }
  // validate defaultArgs
  if (!Array.isArray(defaultArgs)) {
    throw new Error('defaultArgs must be an array')
  }
  // validate callback
  if (callback !== undefined && !(callback instanceof Function)) {
    throw new Error('callback must be instanceof Function')
  }

  return (...args) => theme => {
    const fnArgs = [...Array(fn.length)].map((_, i) => {
      const key = args[i] !== undefined ? args[i] : defaultArgs[i]
      const themeVal = themeGet(
        theme,
        defaultScales[i],
        key instanceof Function ? key(theme) : key
      )

      return callback ? callback(themeVal, theme, i, args) : themeVal
    })

    return fn(...fnArgs)
  }
}

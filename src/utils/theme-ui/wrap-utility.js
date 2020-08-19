import { get } from 'theme-ui'

export const themeGet = (theme, scale, key) => {
  let themeVal = get(theme, `${scale}.${key}`, key)
  if (typeof themeVal === 'string') {
    themeVal = themeVal.replace(/^var\(--(\w+)(.*?), /, '').replace(/\)/, '')
  }
  return themeVal
}

// fn: required >> Function
// themeScaleKeyDefaults: required >> String || Object || Array[String || Object || Array[any]]
// INPUT
// 'tScale'
// {tScale: tKey}
// ['tScale', {tScale: tKey}, [tScale, tKey], ...]
// OUTPUT
// [[tScale, tKey]]
// callback: optional >> Function --note: callback is applied to each argument value passed into fn, after the argument's theme value has been retrieved, and has access to 4 values: the retrieved theme value, the theme, the current fn index, and the original array of arguments passed into fn
export const wrapUtility = (fn, themeScaleKeyDefaults, callback) => {
  let defaults = themeScaleKeyDefaults
  if (!Array.isArray(defaults)) {
    defaults = [defaults]
  }
  defaults = [...Array(fn.length)].reduce((accumulator, _, i) => {
    const currentVal = defaults[i]
    let keyValuePair
    if (currentVal === undefined) {
      // use previous value
      keyValuePair = accumulator[i - 1]
    } else if (typeof currentVal === 'string') {
      keyValuePair = [currentVal, undefined]
    } else if (Array.isArray(currentVal)) {
      keyValuePair = currentVal
    } else if (typeof currentVal === 'object' && currentVal !== null) {
      keyValuePair = Object.entries(currentVal)[0]
    } else {
      throw new Error('wrong defaults type')
    }

    return [...accumulator, keyValuePair]
  }, [])

  return (...args) => theme => {
    const fnArgs = defaults.map((keyValuePair, i) => {
      const [themeScale, themeKey] = keyValuePair
      const key = args[i] !== undefined ? args[i] : themeKey
      const themeResult = themeGet(
        theme,
        themeScale,
        key instanceof Function ? key(theme) : key
      )

      return callback ? callback(themeResult, theme, i, args) : themeResult
    })

    return fn(...fnArgs)
  }
}

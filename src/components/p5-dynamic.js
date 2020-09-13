import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

function P5Dynamic({ sketch, sketchStyles, style, ...rest }) {
  const canvasParentRef = useRef(null)
  const canvasParentStyles = Object.assign({ margin: '1.5rem 0' }, style)

  const setCanvasStyles = (canvas, styles = {}) => {
    // default styles
    canvas.style['display'] = 'block'
    canvas.style['width'] = '100%'
    canvas.style['height'] = '100%'
    // additional styles
    Object.assign(canvas.style, styles)
  }

  useEffect(() => {
    let canvas
    ;(async function() {
      // dynamic version of: import p5 from 'p5'
      const { default: p5 } = await import('p5')
      // p5 constructor uses 2nd argument to specify parent element of canvas
      ;({ canvas } = new p5(sketch, canvasParentRef.current))
      setCanvasStyles(canvas, sketchStyles)
    })()
    return () => {
      canvas.remove()
    }
  }, [sketch, sketchStyles])

  return <div ref={canvasParentRef} style={canvasParentStyles} {...rest} />
}

P5Dynamic.propTypes = {
  sketch: PropTypes.func.isRequired,
  sketchStyles: PropTypes.object,
  style: PropTypes.object
}

export default P5Dynamic

import React from 'react'
import PropTypes from 'prop-types'
// @jsx jsx
import { jsx, Box, Button } from 'theme-ui'

const ButtonIcon = React.forwardRef(({ icon, iconPosition, ...rest }, ref) => {
  const sxButton = {
    columnGap: 3,
    ...(iconPosition === 'right' && { flexDirection: 'row-reverse' })
  }
  const sxIcon = {
    m: -1,
    width: 5,
    height: 5,
    flex: 'none'
  }

  return (
    <Button ref={ref} {...rest} sx={{ ...sxButton }}>
      <Box as={icon} sx={{ ...sxIcon }} />
      {rest.children}
    </Button>
  )
})

ButtonIcon.defaultProps = {
  iconPosition: 'left'
}

ButtonIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  iconPosition: PropTypes.oneOf(['left', 'right'])
}

export default ButtonIcon

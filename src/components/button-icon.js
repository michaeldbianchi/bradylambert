import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from 'theme-ui'

const ButtonIcon = React.forwardRef(
  ({ icon, iconPosition = 'left', sx, ...rest }, ref) => {
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
      <Button ref={ref} {...rest} sx={{ ...sxButton, ...sx }}>
        <Box as={icon} sx={{ ...sxIcon }} />
        {rest.children}
      </Button>
    )
  }
)

ButtonIcon.displayName = 'ButtonIcon'

ButtonIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  sx: PropTypes.object
}

export default ButtonIcon

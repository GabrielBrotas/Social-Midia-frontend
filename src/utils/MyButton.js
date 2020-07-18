import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

//tooltip vai mostrar um nome(title) quando o mouse passar por cima do icone 
export default ({children, onClick, tip, btnClassName, tipClassName}) => (
    
    <Tooltip title={tip} className={tipClassName} placement="top">
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)

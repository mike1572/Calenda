
import React from 'react';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

let MyButton =  ({ children, onClick, btnClassName, tipClassName}) => (
    <Tooltip title="Close" placement="top">
        <IconButton onClick={onClick} className='closeButtonLeft' size="small">
            {children}
        </IconButton>
    </Tooltip>
)

export default MyButton;
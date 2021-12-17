
import React from 'react';
import Typography from '@mui/material/Typography';

let Copyright = (props) =>  {
    return (
        <div style={{margin: '10 0 10 0'}}>
            <br/>
            <Typography variant="body2" color="secondary" align="center" >
                {'Copyright © Calenda '}
                {new Date().getFullYear()}
                {'.'}
                <br/>
                Built with love by the one and only Mike Dimitrov
            
            </Typography>
            <br/>
        </div>

    );
}

export default Copyright;
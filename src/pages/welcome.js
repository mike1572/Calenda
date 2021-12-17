
import React from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from '@mui/material/Typography';
import Box from "@mui/system/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Image from '../images/back.jpg'
import Peace from '../images/peace.jpg'
import Pro from '../images/pro.jpg'

import Copyright from '../components/layout/Copyright';

const styles = {

    paperContainer: {
        backgroundImage: `url(${Image})`,
        margin: 0,
        backgroundPosition: 'center', 
        backgoundRepeat: 'no-repeat',
        backgroundSize: 'cover', 
        padding: '5%', 
    }
};

let Welcome = (props) => {

    return (
        <div className="welcome">
            <Box style={styles.paperContainer} sx={{ pt: 8, pb: 6 }}>
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        align="center"
                        color="#ffffff"
                        gutterBottom
                        fontSize={47}
                        fontStyle='oblique'
                        fontWeight="bold"                        
                    >
                    Calenda
                    </Typography>
                    <Typography fontSize={25} align="center" color="#ffffff" paragraph boxShadow={1}>
                    The best way for patients to easily book appointments with their healthcare 
                    professionals and for providers to manage their meetings.  
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                    <Button variant="contained" color="inherit" component={Link} to='/login'>Log In</Button> 
                    </Stack>
                    
                    
                </Container>
            </Box>

            <Box sx={{ flexGrow: 1 }} style={{marginTop: '18px'}}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={10} md={5}>
                        <Card aria-disabled>
                            <CardActionArea component={Link} to='/patient' >
                                    <CardMedia
                                    component="img"
                                    height="250vh"
                                    image={Peace}
                                    alt="green iguana"
                                    />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" color="secondary">
                                        Patients
                                    </Typography>
                                    <Typography variant="body1" >
                                        Manage your own and your family's appointments with healthcare providers worry free. It's easy and simple.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant="outlined" color="secondary" component={Link} to='/patient'>Sign Up Today</Button> 
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={10} md={5}>
                    <Card aria-disabled>
                        <CardActionArea component={Link} to='/professional'>
                                    <CardMedia
                                    component="img"
                                    height="250vh"
                                    image={Pro}
                                    alt="green iguana"
                                    />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" color="secondary">
                                        Professionals
                                    </Typography>
                                    <Typography variant="body1" >
                                        Get notified when patients book appointments with you. Manage your patients list and schedule yourself.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant="outlined" color="secondary" component={Link} to='/professional'>Register Now</Button> 
                            </CardActions>
                        </Card>
                    </Grid>    
                </Grid>
            </Box>
            <Copyright />

        </div>
    )

}


export default Welcome;


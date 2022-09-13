import React, { useContext } from 'react';
import {Container, Grid, Box, Button, Card, Avatar, Typography} from '@material-ui/core';
import {Context} from "../index.js"
import firebase from 'firebase/compat/app';
import google from '../images/google.png'

const Login = () => {

    const {auth} = useContext(Context)
    
    const login = async () =>{
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)
        console.log(user);
    }

    return (
        <Container>

            
            <Grid container 
            style={{height: window.innerHeight -50}}
            alignItems={'center'}
            justifyContent={'center'}
            ><Box variant="outlined" style={{padding: "10px"}} boxShadow={3} >
                        <Typography variant='h5' align='center' >
                            Sign in with Google
                        </Typography>
                    <Box p={5} display="flex" >
                        <Avatar src={google} style={{ marginRight: "30px"}}/>
                        <Button onClick={login} variant="contained" color='blue'>Sign in</Button>
                    </Box>
                    </Box>
            </Grid>
        </Container>
    );
};

export default Login;
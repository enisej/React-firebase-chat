import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import {Button, Grid, Avatar, Typography} from '@material-ui/core';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import {NavLink} from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth"
import { Context } from '../index';

const Navbar = () => {

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        
        <Box sx={{ flexGrow: 1 }} >
          
      <AppBar color={"primary"} position="static" >
        <Toolbar variant={"dense"}>
            <Typography style={{marginRight: "20px"}}>ChatLogo</Typography>
        <NavLink to={CHAT_ROUTE}>
                    <Button variant={"contained"} color={"success"}>Chat</Button>
        </NavLink>
            <Grid container justifyContent={"flex-end"}>
                {user ?
                <div style={{display: "flex"}}>
                    <Avatar src={user.photoURL} style={{marginRight: "20px"}}/>
                    <Button  onClick={() =>  auth.signOut()} variant={"contained"} color={"success"} style={{marginRight: "20px"}} >Logout</Button>
                </div>
                :
                <NavLink to={LOGIN_ROUTE}>
                    <Button variant={"contained"} color={"success"}>Login</Button>
                </NavLink>
                }
                
            </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    );
};

export default Navbar;
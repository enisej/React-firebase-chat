import React, {useContext, useState, useEffect, useRef} from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import { Context } from '../index';
import {Container, Grid, TextField, Button, Avatar, Box, Typography} from "@material-ui/core";
import { useCollectionData } from "react-firebase-hooks/firestore"
import Loader from './Loader';
import firebase from 'firebase/compat/app';

const Chat = () => {

    

    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('') 
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')

    }

    const messageRef = useRef(null)

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

    if(loading) {
        return <Loader/>
    }

 
    return (
        <Container>
            <Grid container 
            justifyContent='center'
            style={{height: window.innerHeight -70, marginTop: '20px',  }} >
                <Box borderRadius={20} boxShadow={3} style={{width: '100%', height: '70vh', overflowY: 'auto', backgroundColor: 'whitesmoke'}}>
                    {messages.map(message => 
                        <div style={{
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 10,
                            
                        }}
                        key={message.createdAt} >
                            {user.uid !== message.uid ?
                                <Avatar src={message.photoURL}/>
                                :
                                <></>    
                            }
                            <Grid container>
                                <Typography>{message.displayName}</Typography>
                            </Grid>
                            <div
                            style=
                            {{
                                borderRadius: 10,
                                backgroundColor: 'lightblue',
                                border: user.uid === message.uid ? '1px solid grey' : '1px solid grey',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                maxWidth: '400px',
                                padding: 10,
                                wordWrap: 'break-word'
                                
                            }}
                            >
                            <Typography ref={messageRef} >{message.text}</Typography>    
                            </div>
                    
                        </div>
                        )}
                </Box>
                <Box
                        container
                        style={{width: '100%', height: '55px', display: 'flex'}}
                    >
                        
                        <TextField 
                            variant={"outlined"}
                            maxRows={2}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            fullWidth
                            placeholder='Type message here...'
                        />
                        <Button onClick={sendMessage} variant='contained' color='primary'>Send</Button>
                        
                    </Box>
            </Grid>
        </Container>
    );
};

export default Chat;
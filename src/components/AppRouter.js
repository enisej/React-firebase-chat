import React, { useContext } from 'react';
import {Route, Routes} from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import Chat from './Chat';
import Login from './Login';
import { useAuthState } from "react-firebase-hooks/auth"
import { Context } from '../index';

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return user ? 
    (
        <Routes>
            {privateRoutes.map(({path, Component}) => 
                 <Route path={path} key={path} element={<Component replace to={path} exact={true}/>}/>     
                
            )}
             <Route path="*" element={<Chat replace to={CHAT_ROUTE} />} />
        </Routes>
    )
    :
    (
        <Routes>
            {publicRoutes.map(({path, Component}) => 
                <Route path={path} key={path} element={<Component replace to={path} exact={true}/>}/>                
            )}
            <Route path="*" element={<Login replace to={LOGIN_ROUTE} />} />
        </Routes>
    )
};

export default AppRouter;
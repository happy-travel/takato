import React from 'react';

import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AuthCallback, AuthSilent, AuthLogout, AuthKeeperComponent } from './htcore/auth/pages';
import PageTemplate from './pages/page-template';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path='/auth/callback' element={ <AuthCallback /> } />
            <Route exact path='/auth/silent' element={ <AuthSilent /> } />
            <Route exact path='/logout' element={ <AuthLogout /> } />
            <Route path='/*' element={
                <>
                    <AuthKeeperComponent />
                    <PageTemplate />
                </>
            } />
        </Routes>
    </BrowserRouter>
);

export default App;

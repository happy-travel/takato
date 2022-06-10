Auth:

Place Routes:
/auth/callback -> AuthCallback 
/auth/silent -> AuthSilent 
/logout -> AuthLogout

Place AuthKeeperComponent inside all routes that need auth.

Core:
use initApplication  
use HTCore when you need settings and
    

Import: 
authorized() = bool
API = pack to make requests to our APIs

Utils:
getQueryParams
session (window session storage proxy)
localStorage (window local storage proxy)

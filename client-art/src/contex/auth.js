import React ,{createContext} from 'react';

const AuthContext = createContext({
    user: null,
    lgoin: (data)= {},
    logout: () => {}
})
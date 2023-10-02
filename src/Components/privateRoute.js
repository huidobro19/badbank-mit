import {Outlet, Navigate} from 'react-router-dom'
import { AuthContext } from './context';
import React from 'react' 



const PrivateRoutes = () => {
  const { isAuthentic} = React.useContext(AuthContext)
  
  let auth = isAuthentic;
  return (
    auth ? (
      <Outlet />
    ) : (

        <Navigate to="/createAccount" />

    )
  );
};


export default PrivateRoutes
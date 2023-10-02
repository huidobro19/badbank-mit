import './App.css';
import './Components/navbars.css'
import React from 'react'
import NavBar from './Components/navbar';
import Home from './Components/home';

import Withdraw from './Components/withdraw';
import AllData from './Components/alldata';
import Deposit from './Components/deposit';
import SignUp from './Components/SignUp';

import { UserContext } from './Components/context';
import PrivateRoutes from './Components/privateRoute';
import { AuthProvider } from './Components/context';


import { Routes, Route, Link, HashRouter } from 'react-router-dom';


function App() {

  const [previousPage, setPreviousPage] = React.useState(null);


  return (
    <HashRouter>
    <AuthProvider>
      <NavBar/>
        <UserContext.Provider value={{users:[]}}>
          <Routes>
            <Route path="/" element={<Home/>} onLeave={() => {
              setPreviousPage('/');
            }} />

            <Route path="/createAccount" element={<SignUp previousPage={previousPage}/>} />
            <Route element={<PrivateRoutes/>}>
              <Route path="/withdraw" element={<Withdraw/>} />
              <Route path="/alldata" element={<AllData/>} />
              <Route path="/deposit" element={<Deposit/>} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </AuthProvider>  
    </HashRouter>
  );
}

export default App;
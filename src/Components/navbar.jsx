import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './navbars.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context';


function NavBar() {

    const navigate = useNavigate();
    


    const { activeButton } = React.useContext(AuthContext);
    const { setActiveButton} = React.useContext(AuthContext)
    const { setShowMessage} = React.useContext(AuthContext)

    // Función para manejar el clic en un botón
    const handleButtonClick = (buttonId,path) => {
      setActiveButton(buttonId);
      navigate(path);

      if (buttonId === 'createAccount') {
        setShowMessage(false);
      }
      else {
        setShowMessage(true);
      }
    };    



  return (
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Tenth navbar example">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
      <ul class="navbar-nav">
            <li className="nav-item">
              <a
                className={`nav-link ${activeButton === 'home' ? 'active' : ''}`}
                title="Go to Home"
                onClick={() => handleButtonClick('home','/')}
              >
              Home
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${activeButton === 'createAccount' ? 'active' : ''}`}
                title="Create an Account"
                onClick={() => handleButtonClick('createAccount',"/createAccount")}
              >
                Create Account
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${activeButton === 'withdraw' ? 'active' : ''}`}
                title="Withdraw Funds"
                onClick={() => handleButtonClick('withdraw','/withdraw')}
              >
                Withdraw 
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${activeButton === 'deposit' ? 'active' : ''}`}
                title="Deposit Funds"
                onClick={() => handleButtonClick('deposit','/deposit')}
              >
                Deposit
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${activeButton === 'alldata' ? 'active' : ''}`}
                title="See All Data"
                onClick={() => handleButtonClick('alldata','/alldata')}
              >
                All Data
              </a>
            </li>




      </ul>
    </div>
  </div>
</nav>

  );
}

export default NavBar;

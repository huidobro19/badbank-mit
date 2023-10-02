import React from 'react';
import bobImage from '../media/bob.jpg';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CircularText from './circularText';
import { AuthContext } from './context';
import { useNavigate } from 'react-router-dom';
import imagen1 from '../media/imagen1.jpg';
import imagen2 from '../media/imagen2.jpg';
import imagen3 from '../media/imagen3.jpg';


function Home() {

  const { isAuthentic} = React.useContext(AuthContext)
  const { setActiveButton} = React.useContext(AuthContext)
  const navigate = useNavigate();
  const { setShowMessage} = React.useContext(AuthContext)
  return (

      <div className='container-home '>

        <div className="top-left-container">
          <CircularText />
        </div>

        <div className="main-content">

          <div className={ `my-5 text-center ${!isAuthentic && 'border-bottom'}`}>
              <h1 className="display-4 fw-bold text-body-emphasis">Willy's Investments</h1>
              <div className=" mx-auto">
                <p className="lead mb-4">Welcome to Willy's Investments: Your Partner in Financial Success</p>
              </div>
          </div>
        {  !isAuthentic && ( 
          <div className='stocks-image'>
            <button onClick={(e) => {
                            setActiveButton('createAccount');
                            navigate("/createAccount");
                            setShowMessage(false);
                    }} class="btn btn-danger btn-lg" type="button">-$-$- Create Account! -$-$-</button>
          </div>)
        }
        </div>

        {isAuthentic && (
          
        <div class="container marketing" style={{marginTop:'50px'}}>
            <hr className="featurette-divider" />

            <div class="row featurette">
              <div class="col-md-7">
                <h2 class="featurette-heading fw-normal lh-1">Deposit  
                  <button type="button" class="btn btn-outline-success " style={{marginLeft:'10px'}} onClick={(e) => {
                            setActiveButton('deposit');
                            navigate("/deposit");
                            
                    }} >Make a Deposit</button>
                </h2>
                <p class="lead">Ready to grow your savings? Make a deposit today and watch your money grow with our amazing interest rates!</p>
              </div>
              <div class="col-md-5">
                <svg class="bd-placeholder-img featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
                  
                  <rect width="100%" height="100%" fill="var(--bs-secondary-bg)"></rect>
                  <text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text>
                  <image href={imagen1} width="100%" height="100%" />
                </svg>
              </div>
            </div>

            <hr className="featurette-divider" />

            <div class="row featurette">
              <div class="col-md-7 order-md-2">
                <h2 class="featurette-heading fw-normal lh-1">Withdraw    
                  <button type="button" class="btn btn-outline-success " style={{marginLeft:'10px'}} onClick={(e) => {
                            setActiveButton('withdraw');
                            navigate("/withdraw");
                            
                    }}>Withdraw Funds</button>
                </h2>
                <p class="lead">Need to access your funds? Withdraw money easily with our convenient options and secure process.</p>
              </div>
              <div class="col-md-5 order-md-1">
                <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="var(--bs-secondary-bg)"></rect>
                  <image href={imagen2} width="100%" height="100%" />
                </svg>
              </div>
            </div>

            <hr className="featurette-divider" />

            <div class="row featurette">
              <div class="col-md-7">
                <h2 class="featurette-heading fw-normal lh-1">All Data    
                  <button type="button" class="btn btn-outline-dark " style={{marginLeft:'10px'}}onClick={(e) => {
                            setActiveButton('alldata');
                            navigate("/alldata");
                            
                    }}>View All Data</button>
                </h2>
                
                <p class="lead">Explore all your account data and financial information in one place with our comprehensive All Data feature.</p>
              </div>
              <div class="col-md-5">
                <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="var(--bs-secondary-bg)"></rect>
                  <image href={imagen3} width="100%" height="100%" />
                </svg>
              </div>
            </div>
        </div>
        )}

      </div>
  );
}

export default Home;


import React, { useState } from 'react';
import './deposit.css';
import { UserContext } from './context';



const ATMDeposit = ({ onChange , isEmpty}) => {
  return (
    <label className="label huge">
      <h3> Deposit</h3>
      <input id="number-input" type="text" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={isEmpty}></input>
      
    </label>
  );
};

function Deposit() {
  const [deposit, setDeposit] = useState(0);
  const [totalState, setTotalState] = useState(0);
  const [atmMode, setAtmMode] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const [notANumberAlert, setNotANumberAlert] = useState(""); // Alerta para no números
  const [negativeDepositAlert, setNegativeDepositAlert] = useState(""); // Alerta para depósitos negativos
  const [isEmpty, setIsEmpty] = useState(true);
  const [showCoin,setShowCoin] = useState(false)

  const ctx = React.useContext(UserContext);  
  let users = ctx.users 
  let initialBalance = users[0].balance

  React.useEffect(() => {
    setTotalState(initialBalance);
  }, []); 

  const handleChange = (event) => {
    setIsEmpty(event.target.value.trim() === '');
    setDeposit(Number(event.target.value));


  };

  const handleSubmit = (event) => {
    event.preventDefault();
    


    if (isNaN(deposit)) {
      setNotANumberAlert("Not a number! Please enter a valid number.");
      setTimeout(() => setNotANumberAlert(''), 3000);
    } else if (deposit <= 0) {
      setNegativeDepositAlert("Negative deposit is not allowed. Please enter a positive number.");
      setTimeout(() => setNegativeDepositAlert(''), 3000);
    } else {
      let newTotal = totalState + deposit;
      setTotalState(newTotal);
      ctx.users[0].balance = newTotal
      
      setTimeout(() => setSuccessMessage(`Success! Deposit of $${deposit} received.`), 500);
      setShowCoin(true)
      setTimeout(() => setSuccessMessage(''), 3000);
      setTimeout(() => setShowCoin(false), 500);


    }
  };

  return (
  
    <div className="container-deposit">

      {showCoin &&(

      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
      </svg>
      )
      }

      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-piggy-bank-fill" viewBox="0 0 16 16">
        <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595Zm7.173 3.876a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199Zm-8.999-.65a.5.5 0 1 1-.276-.96A7.613 7.613 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.602 6.602 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
      </svg>


      <form onSubmit={handleSubmit}>
        <h2 id="total">Account Balance $ {totalState}</h2>

        <ATMDeposit onChange={handleChange} isEmpty={isEmpty} ></ATMDeposit>

        <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
          <symbol id="check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </symbol>
          <symbol id="info-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </symbol>
          <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </symbol>
        </svg>
      </form>  

      
        {/* Mostrar alerta si no es un número */}
        {notANumberAlert && (
          <p className="error-message">
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Error:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
              <div>
                {notANumberAlert}
              </div>
            </div>
          </p>
        )}

        {/* Mostrar alerta si es un depósito negativo */}
        {negativeDepositAlert && (
          <p className="error-message">
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Error:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
              <div>
                {negativeDepositAlert}
              </div>
            </div>
          </p>
        )}

        {successMessage && (
         <div className="alert alert-success d-flex align-items-center" role="alert">
          <svg className="bi  me-2" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill"/></svg>
          <div>
            {successMessage}
          </div>
        </div>
        )}
      

    </div>
  )
}

export default Deposit;

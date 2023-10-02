import React, { useState } from 'react';
import { UserContext } from './context';

const ATMDeposit = ({ onChange , isEmpty}) => {
  return (
    <label className="label huge">
      <h3> Withdraw</h3>
      <input id="number-input" type="text" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={isEmpty}></input>
    </label>
  );
};

function Withdraw(){
  const [deposit, setDeposit] = useState(0);
  const [totalState, setTotalState] = useState(100);
  const [atmMode, setAtmMode] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const [notANumberAlert, setNotANumberAlert] = useState(""); // Alerta para no números
  const [negativeDepositAlert, setNegativeDepositAlert] = useState(""); // Alerta para depósitos negativos
  const [isEmpty, setIsEmpty] = useState(true);
  const [overdraftAlert, setOverdraftAlert] = useState(""); // New state for overdraft alert
  const [showWallet,setShowWallet] = useState(false)


  const handleChange = (event) => {
    setIsEmpty(event.target.value.trim() === '');
    setDeposit(Number(event.target.value));


  };


  const ctx = React.useContext(UserContext);  
  let users = ctx.users 
  let initialBalance = users[0].balance

  React.useEffect(() => {
    setTotalState(initialBalance);
  }, []); 


  const handleSubmit = (event) => {
    event.preventDefault();
    


    if (isNaN(deposit)) {
      setNotANumberAlert("Not a number! Please enter a valid number.");
      setTimeout(() => setNotANumberAlert(''), 3000);
    } else if (deposit > totalState) {
      setOverdraftAlert("Insufficient funds. You cannot withdraw more than your account balance.");
      setTimeout(() => setOverdraftAlert(''), 3000);
    } else {
      let newTotal = totalState - deposit;
      setTotalState(newTotal);
      ctx.users[0].balance = newTotal


      setTimeout(() => setSuccessMessage(`Success! Withdraw of $${deposit} received.`),500)
      setTimeout(() => setSuccessMessage(''), 3000);
      setShowWallet(true)
      setTimeout(() => setShowWallet(''), 500);


    }
  };

  return (
    <div className="container-deposit">

      {showWallet &&(

      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
        <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"/>
      </svg>

      )
      }

      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
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

       {/* New overdraft alert */}
       {overdraftAlert && (
          <p className="error-message">
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Error:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
              <div>
                {overdraftAlert}
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
      </form>
    </div>
  
  )
}

export default Withdraw
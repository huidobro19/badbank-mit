import React from 'react'
import {UserContext} from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './alldata.css';



function UserCard({ user }) {

  return (
    <div className="card text-bg-dark mb-3" style={{ maxWidth: '18rem' }}>
      
      
      <div className="card text-bg-danger" style={{width: "18rem" }}>
        <div className="card-header">
        User: {user.name}
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">Email: {user.email}</li>
          <li className="list-group-item">Balance: {user.balance}</li>
          <li className="list-group-item">Password: {user.password}</li>
        </ul>

      </div>
      
      

      
    </div>
  );
}





function AllData(){
  const ctx = React.useContext(UserContext);
  console.log('contex:',ctx.users)
  let users= ctx.users

  return (
    <div className=' container-alldata'>

      <br/>
      <h3 className='text-uppercase font-weight-bold'>All Data</h3>

      <div className='container-alldata'>
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
}


export default AllData
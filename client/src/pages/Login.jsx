// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { QUERY_USER } from '../utils/queries';
// import { LOGIN, ADD_USER } from '../utils/mutations';
import { initMDB, Tab } from "mdb-ui-kit";
import './Home.css';

// Initialize MDB UI Kit components
initMDB([Tab]);

// function AuthenticationForm({ onSubmit, username, password, onChange, loading, error }) {
//     return (
//       <form onSubmit={onSubmit}>
//         <label htmlFor="username">
//           Username:
//           <input type="text" id="username" value={username} onChange={onChange('username')} />
//         </label>
//         <label htmlFor="password">
//           Password:
//           <input type="password" id="password" value={password} onChange={onChange('password')} />
//         </label>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Processing...' : 'Submit'}
//         </button>
//         {error && <p classNameName="error-message">Error: {error.message}</p>}
//       </form>
//     );
//   }
  
  function Login() {
    const triggerPillList = document.querySelectorAll('.nav-item a')

    triggerPillList.forEach((triggerEl) => {
      const pillTrigger = new Tab(triggerEl)
    
      triggerEl.addEventListener('click', (e) => {
        e.preventDefault()
        pillTrigger.show()
      })
    })
    return (
      <main className="cardContainer">
           <div className="login m-auto">
        {/* <!-- Pills navs --> */}
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
                <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                    aria-controls="pills-login" aria-selected="true">Login</a>
            </li>
            <li className="nav-item" role="presentation">
                <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                    aria-controls="pills-register" aria-selected="false">Register</a>
            </li>
        </ul>
        {/* <!-- Pills navs --> */}

        {/* <!-- Pills content --> */}
        <div className="tab-content">
            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form>
                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-4">
                        <input type="email" id="loginName" className="form-control" />
                        <label className="form-label" htmlFor="loginName">Email or username</label>
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="form-outline mb-4">
                        <input type="password" id="loginPassword" className="form-control" />
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                    </div>


                    {/* <!-- Submit button --> */}
                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                    {/* <!-- Register buttons --> */}
                    <div className="text-center">
                        <p>Not a member? <a href="#!">Register</a></p>
                    </div>
                </form>
            </div>
            <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                <form>
                    {/* <!-- Name input --> */}
                    <div className="form-outline mb-4">
                        <input type="text" id="registerName" className="form-control" />
                        <label className="form-label" htmlFor="registerName">Name</label>
                    </div>

                    {/* <!-- Username input --> */}
                    <div className="form-outline mb-4">
                        <input type="text" id="registerUsername" className="form-control" />
                        <label className="form-label" htmlFor="registerUsername">Username</label>
                    </div>

                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-4">
                        <input type="email" id="registerEmail" className="form-control" />
                        <label className="form-label" htmlFor="registerEmail">Email</label>
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="form-outline mb-4">
                        <input type="password" id="registerPassword" className="form-control" />
                        <label className="form-label" htmlFor="registerPassword">Password</label>
                    </div>

                    {/* <!-- Repeat Password input --> */}
                    <div className="form-outline mb-4">
                        <input type="password" id="registerRepeatPassword" className="form-control" />
                        <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                    </div>
                    
                    {/* <!-- Submit button --> */}
                    <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
                </form>
            </div>
        </div>
        {/* <!-- Pills content --> */}
    </div>
      </main>
    );
  }
  
  export default Login;
  
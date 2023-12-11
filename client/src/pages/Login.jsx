import React, { useState } from 'react';
import { initMDB, Tab } from 'mdb-ui-kit';
import './Home.css';

// Initialize MDB UI Kit components
initMDB([Tab]);

function Login() {
  const [activeTab, setActiveTab] = useState('pills-login');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <main className="cardContainer">
      <div className="login m-auto">
        {/* Pills navs */}
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'pills-login' ? 'active' : ''}`}
              onClick={() => handleTabClick('pills-login')}
              role="tab"
              aria-controls="pills-login"
              aria-selected={activeTab === 'pills-login'}
            >
              Login
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'pills-register' ? 'active' : ''}`}
              onClick={() => handleTabClick('pills-register')}
              role="tab"
              aria-controls="pills-register"
              aria-selected={activeTab === 'pills-register'}
            >
              Register
            </a>
          </li>
        </ul>
        {/* Pills navs */}

        {/* Pills content */}
        <div className="tab-content">
          <div className={`tab-pane fade ${activeTab === 'pills-login' ? 'show active' : ''}`} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input type="email" id="loginName" className="form-control" />
                <label className="form-label" htmlFor="loginName">
                  Email or username
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input type="password" id="loginPassword" className="form-control" />
                <label className="form-label" htmlFor="loginPassword">
                  Password
                </label>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>
            </form>
          </div>
          <div className={`tab-pane fade ${activeTab === 'pills-register' ? 'show active' : ''}`} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form>
              {/* Name input */}
              <div className="form-outline mb-4">
                <input type="text" id="registerName" className="form-control" />
                <label className="form-label" htmlFor="registerName">
                  Name
                </label>
              </div>

              {/* Username input */}
              <div className="form-outline mb-4">
                <input type="text" id="registerUsername" className="form-control" />
                <label className="form-label" htmlFor="registerUsername">
                  Username
                </label>
              </div>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input type="email" id="registerEmail" className="form-control" />
                <label className="form-label" htmlFor="registerEmail">
                  Email
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input type="password" id="registerPassword" className="form-control" />
                <label className="form-label" htmlFor="registerPassword">
                  Password
                </label>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block mb-3">
                Sign up
              </button>
            </form>
          </div>
        </div>
        {/* Pills content */}
      </div>
    </main>
  );
}

export default Login;

// Import necessary libraries and queries
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, SIGNUP_USER, QUERY_USER } from '../../utils/queries';
import './Home.css';

function Login() {
  const [activeTab, setActiveTab] = useState('pills-login');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Define login mutation
  const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER, {
    refetchQueries: [{ query: QUERY_USER, variables: { username: loginUsername } }],
  });

  // Define signup mutation
  const [signupUser, { loading: signupLoading, error: signupError }] = useMutation(SIGNUP_USER, {
    refetchQueries: [{ query: QUERY_USER, variables: { username: signupUsername } }],
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({
        variables: { username: loginUsername, password: loginPassword },
      });
      // Handle successful login, e.g., redirect to another page
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signupUser({
        variables: { username: signupUsername, email: signupEmail, password: signupPassword },
      });
      // Handle successful signup, e.g., redirect to another page
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error
    }
  };

  return (
    <main className="cardContainer">
      <div className="login m-auto">
        {/* Pills navs */}
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          {/* ... (existing code) */}
        </ul>
        {/* Pills navs */}

        {/* Pills content */}
        <div className="tab-content">
          <div className={`tab-pane fade show ${activeTab === 'pills-login' ? 'active' : ''}`} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            {/* Login form */}
            <form onSubmit={handleLogin}>
              <label>
                Username:
                <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
              </label>
              <label>
                Password:
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              </label>
              <button type="submit" disabled={loginLoading}>
                Login
              </button>
            </form>
            {/* Display login error if any */}
            {loginError && <p>Error: {loginError.message}</p>}
          </div>

          <div className={`tab-pane fade ${activeTab === 'pills-register' ? 'show active' : ''}`} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            {/* Signup form */}
            <form onSubmit={handleSignup}>
              {/* ... (existing signup form) */}
              <button type="submit" disabled={signupLoading}>
                Signup
              </button>
            </form>
            {/* Display signup error if any */}
            {signupError && <p>Error: {signupError.message}</p>}
          </div>
        </div>
        {/* Pills content */}
      </div>
    </main>
  );
}

export default Login;

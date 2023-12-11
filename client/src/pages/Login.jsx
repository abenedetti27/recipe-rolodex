import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { LOGIN, ADD_USER } from '../utils/mutations';
import { initMDB, Tab } from "mdb-ui-kit";
import './Home.css';

// Initialize MDB UI Kit components
initMDB([Tab]);


// ... (imports)

function LoginForm({ onSubmit, username, password, onChange, loading, error }) {
    return (
      <form onSubmit={onSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={onChange('username')} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={onChange('password')} />
        </label>
        <button type="submit" disabled={loading}>
          Login
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    );
  }
  
  function Login() {
    const [activeTab, setActiveTab] = useState('pills-login');
  
    const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    };
  
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
  
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
  
    const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(LOGIN, {
      refetchQueries: [{ query: QUERY_USER, variables: { username: loginUsername } }],
    });
  
    const [signupUser, { loading: signupLoading, error: signupError }] = useMutation(ADD_USER, {
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
          variables: { username: signupUsername, email: signupEmail, password: signupPassword, firstName: signupfirstName, lastName: signuplastName },
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
          {/* ... (existing code) */}
          {/* Pills navs */}
  
          {/* Pills content */}
          <div className="tab-content">
            <div className={`tab-pane fade show ${activeTab === 'pills-login' ? 'active' : ''}`} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
              {/* Login form */}
              <LoginForm
                onSubmit={handleLogin}
                username={loginUsername}
                password={loginPassword}
                onChange={(field) => (e) => field === 'username' ? setLoginUsername(e.target.value) : setLoginPassword(e.target.value)}
                loading={loginLoading}
                error={loginError}
              />
            </div>
  
            <div className={`tab-pane fade ${activeTab === 'pills-register' ? 'show active' : ''}`} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
              {/* Signup form */}
              <LoginForm
                onSubmit={handleSignup}
                username={signupUsername}
                password={signupPassword}
                onChange={(field) => (e) => field === 'username' ? setSignupUsername(e.target.value) : setSignupPassword(e.target.value)}
                loading={signupLoading}
                error={signupError}
              />
            </div>
          </div>
          {/* Pills content */}
        </div>
      </main>
    );
  }
  
  export default Login;
  
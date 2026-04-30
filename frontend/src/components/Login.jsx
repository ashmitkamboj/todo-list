import { useState } from 'react';
import { loginUser, registerUser } from '../services/api';
import { motion } from 'framer-motion';

function Login({ setToken, setUserEmail }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLoginMode) {
        const response = await loginUser(email, password);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);
        setToken(response.data.token);
        setUserEmail(response.data.email);
      } else {
        await registerUser(email, password);
        const loginResponse = await loginUser(email, password);
        localStorage.setItem('token', loginResponse.data.token);
        localStorage.setItem('email', loginResponse.data.email);
        setToken(loginResponse.data.token);
        setUserEmail(loginResponse.data.email);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <motion.div 
        className="app-container" 
        style={{ maxWidth: '400px' }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="app-title" style={{ textAlign: 'center' }}>
          {isLoginMode ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {error && <p style={{ color: 'var(--danger-color)', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            className="todo-input" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            className="todo-input" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="todo-button" style={{ width: '100%' }}>
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--secondary-color)', cursor: 'pointer' }}
           onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? "Don't have an account? Register here" : "Already have an account? Login here"}
        </p>
      </motion.div>
    </div>
  );
}

export default Login;

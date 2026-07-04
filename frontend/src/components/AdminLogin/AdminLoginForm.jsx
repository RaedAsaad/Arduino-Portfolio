import { useState } from 'react';
import './AdminLoginForm.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Height } from '@mui/icons-material';

export default function AdminLoginForm({ onClose, onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ username, password }),
        });
            if (response.ok) {
                onLoginSuccess();
                onClose();
            } else if (response.status === 401) {
                setError('Invalid username or password.');
            } else {
                setError('Something went wrong. Please try again');
            }
        } catch (netError) {
            setError('Cannot connect to the server. Is the backend running?');
        }
    };

    return (
        <div>
          <div className="form-background">
            <form onSubmit={handleSubmit}>
              <h1 className='login-header'>Login</h1>
                <div className='inputs'>
                  <input 
                    id="standard-basic-username-input" 
                    className='username-input-field input' 
                    placeholder="Username" 
                    variant="standard" 
                  />       
                  <input 
                    id="standard-basic-password-input" 
                    className='password-input-field input' 
                    placeholder="Password" 
                    type="password" 
                    variant="standard" 
                    required
                  />                </div>
                <div className='form-buttons'>
                  <button type='submit' className='submit-button button'>Submit</button>
                  <button type='clear' className='clear-button button'>Clear</button>
                </div>
            </form>
          </div>
        </div>
    )

}
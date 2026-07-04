import { useState } from 'react';
import './AdminLoginForm.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
              <TextField id="standard-basic" label="Standard" variant="standard" />
            </form>
          </div>
        </div>
    )

}
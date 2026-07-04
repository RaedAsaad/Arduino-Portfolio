import { useEffect, useState } from 'react';
import AdminLoginForm from './components/AdminLogin/AdminLoginForm';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BuildIcon from '@mui/icons-material/Build';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

function App() {
  const [projects, setProjects] = useState([]);

  // Form input states
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  // Project Detail Modal State
  const [selectedProject, setSelectedProject] = useState(null);

  // --- NEW AUTHENTICATION STATES ---
  const [isAdmin, setIsAdmin] = useState(false); // Controls if the form is visible
  const [loginOpen, setLoginOpen] = useState(false); // Controls the login popup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 1. Fetch existing data from the database
  const fetchProjects = () => {
    fetch('http://localhost:8085/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error fetching data:', err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 2. Handle form submission to send data to Spring Boot
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProjectPayload = {
      title: title,
      shortDescription: shortDescription,
      completionDate: completionDate || null
    };

    fetch('http://localhost:8085/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProjectPayload),
    })
      .then((res) => res.json())
      .then((savedProject) => {
        setProjects([...projects, savedProject]);
        setTitle('');
        setShortDescription('');
        setCompletionDate('');
      })
      .catch((err) => console.error('Error adding project:', err));
  };

  // 3. Handle Login Verification
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // TEMPORARY FRONTEND CHECK: We will connect this to the Spring Boot backend next!
    if (username === 'admin' && password === 'password123') {
      setIsAdmin(true);
      setLoginOpen(false); // Close modal
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid admin credentials!');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <AdminLoginForm />
  );
}

export default App;
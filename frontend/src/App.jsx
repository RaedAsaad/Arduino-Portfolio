import { useEffect, useState } from 'react';
import Navbar  from './components/Navbar/Navbar'
import { handleAdminClick }  from './components/Navbar/Navbar'
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  // 1. Fetching your projects (Updated to use port 8080 to match Docker)
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8085/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError('Error fetching data: ' + err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    // You can also trigger a re-fetch of projects here if admin projects are different
  };

  const handleLogout = () => {
    setIsAdmin(false);
    // If using JWT tokens later, you would clear the token here
  };

  return (
    <div>
      <Navbar onAdminClick={handleAdminClick} />
      
      {/* Rest of your page components go here */}
    </div>
  );
}

export default App;
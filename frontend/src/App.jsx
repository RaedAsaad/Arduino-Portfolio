import { useState, useEffect } from 'react';
import AdminLoginForm from './components/AdminLogin/AdminLoginForm'; // Make sure the path matches your folder structure

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
    <div className="app-container">
      <header className="app-header">
        <h1>Arduino Project Showcase</h1>
        
        {/* Navigation / Auth Buttons */}
        <div className="auth-controls">
          {isAdmin ? (
            <>
              <span className="admin-badge">Admin Mode</span>
              <button className="nav-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="nav-button" onClick={() => setShowLogin(true)}>Admin Login</button>
          )}
        </div>
      </header>

      <main>
        {/* 2. Conditionally render the Login Modal */}
        {showLogin && (
          <div className="modal-overlay">
            <AdminLoginForm 
              onClose={() => setShowLogin(false)} 
              onLoginSuccess={handleLoginSuccess} 
            />
          </div>
        )}

        {/* Display project fetching errors if any */}
        {error && <p className="error-text">{error}</p>}

        {/* 3. Your main content / project list */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {isAdmin && <button className="edit-btn">Edit Project</button>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
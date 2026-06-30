import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  
  // State variables to capture input values from our form fields
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');

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
    e.preventDefault(); // Prevents the browser from reloading the entire page

    const newProjectPayload = {
      title: title,
      shortDescription: shortDescription,
      completionDate: completionDate || null // If empty, backend will default it
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
        // Optimistically update frontend state by appending the newly saved project
        setProjects([...projects, savedProject]);
        
        // Clear out the input boxes for the next entry
        setTitle('');
        setShortDescription('');
        setCompletionDate('');
      })
      .catch((err) => console.error('Error adding project:', err));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      
      {/* Dynamic Data Entry Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Log a New Build</h3>
        
        <input 
          type="text" 
          placeholder="Project Title (e.g., arduino Uno Sonar)"
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        
        <textarea 
          placeholder="What did you build? Mention components like resistors, sensors, etc." 
          value={shortDescription} 
          onChange={(e) => setShortDescription(e.target.value)} 
          required 
        />
        
        <input 
          type="date" 
          value={completionDate} 
          onChange={(e) => setCompletionDate(e.target.value)} 
        />
        
        <button type="submit" style={{ cursor: 'pointer', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Save Project
        </button>
      </form>

      {/* Existing Cards Display Layout */}
      <div>
        {projects.map((project) => (
          <div key={project.id} className="card" style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            <h2>{project.title}</h2>
            <p>{project.shortDescription}</p>
            <small>Completed: {project.completionDate}</small>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
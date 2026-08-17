import { useEffect, useState } from 'react';
import Navbar  from './components/Navbar/Navbar'
import { handleAdminClick }  from './components/Navbar/Navbar'
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
    <div>
      <Navbar onAdminClick={handleAdminClick} />
      
      {/* Rest of your page components go here */}
    </div>
  );
}

export default App;
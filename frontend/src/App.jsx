import { useEffect, useState } from 'react';
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

function App() {
  const [projects, setProjects] = useState([]);

  // Form input states
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  // State to track which project card is clicked for the detail modal
  const [selectedProject, setSelectedProject] = useState(null);

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

  return (
    <Container maxWidth="md" style={{ marginTop: '40px', marginBottom: '40px' }}>

      {/* Title Header */}
      <Box display="flex" alignItems="center" gap={1} mb={4}>
        <BuildIcon color="primary" fontSize="large" />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Arduino Dev Portfolio
        </Typography>
      </Box>

      {/* Predesigned Form Section */}
      <Card variant="outlined" sx={{ mb: 5, p: 2, borderRadius: '12px', boxShadow: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="600">
            Log a New Build
          </Typography>
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Project Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Arduino Uno Sonar"
              required
            />
            <TextField
              label="What did you build?"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Mention components like resistors, sensors, microcontrollers, etc."
              required
            />
            <TextField
              label="Completion Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
            />
            <Button type="submit" variant="contained" size="large" sx={{ mt: 1, py: 1.2 }}>
              Save Project
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom fontWeight="600" mb={2}>
        My Projects
      </Typography>

      {/* Grid Layout Displaying Side-by-Side Cards */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} key={project.id}>
            <Card sx={{ height: '100%', borderRadius: '12px', boxShadow: 2 }}>
              {/* CardActionArea gives it a neat ripple effect when clicked */}
              <CardActionArea sx={{ height: '100%', p: 1 }} onClick={() => setSelectedProject(project)}>
                <CardContent>
                  <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom noWrap>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {project.shortDescription}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
                    <CalendarTodayIcon fontSize="small" />
                    <Typography variant="caption">
                      {project.completionDate ? project.completionDate : 'No date provided'}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Predesigned Dialog Modal View for Detailed Project Layout */}
      <Dialog
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        {selectedProject && (
          <>
            <DialogTitle>
              <Typography variant="h5" fontWeight="bold">{selectedProject.title}</Typography>
              <Box display="flex" alignItems="center" gap={0.5} color="text.secondary" mt={1}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body2">
                  Completed: {selectedProject.completionDate ? selectedProject.completionDate : 'N/A'}
                </Typography>
              </Box>
            </DialogTitle>
            <Divider variant="middle" />
            <DialogContent>
              <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                Full Description & Build Details:
              </Typography>
              <Typography variant="body1" color="text.primary" style={{ whiteSpace: 'pre-wrap' }}>
                {selectedProject.shortDescription}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedProject(null)} variant="outlined" color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

    </Container>
  );
}

export default App;
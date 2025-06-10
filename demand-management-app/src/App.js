import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import FutureIdeasView from './FutureIdeasView';
import ProjectsView from './ProjectsView';
import BacklogView from './BacklogView';
import GanttView from './GanttView';
import { AppContext, initializeState } from './AppContext'; // Import initializeState
import { sampleIdeasData, sampleProjectsData, sampleBacklogData } from './sampleData'; // Import sample data directly for useEffect
import './App.css';

function App() {
  const [ideas, setIdeas] = useState(() => initializeState('ideas', sampleIdeasData));
  const [projects, setProjects] = useState(() => initializeState('projects', sampleProjectsData));
  const [backlogItems, setBacklogItems] = useState(() => initializeState('backlogItems', sampleBacklogData));

  // This useEffect will run once on mount to populate localStorage if it's initially empty.
  useEffect(() => {
    if (!localStorage.getItem('ideas') || JSON.parse(localStorage.getItem('ideas')).length === 0) {
      localStorage.setItem('ideas', JSON.stringify(sampleIdeasData));
      // If we just set it, we might want to re-initialize state, but initializeState handles this.
      // Or, ensure the initial state itself uses sample data if localStorage is empty,
      // and this useEffect just ensures it's written back.
      // The current initializeState should load sampleData if localStorage is empty/invalid.
      // This useEffect makes sure that sample data is *written* to localStorage if it wasn't there.
    }
    if (!localStorage.getItem('projects') || JSON.parse(localStorage.getItem('projects')).length === 0) {
      localStorage.setItem('projects', JSON.stringify(sampleProjectsData));
    }
    if (!localStorage.getItem('backlogItems') || JSON.parse(localStorage.getItem('backlogItems')).length === 0) {
      localStorage.setItem('backlogItems', JSON.stringify(sampleBacklogData));
    }
  }, []); // Empty dependency array ensures this runs only once on mount.


  useEffect(() => {
    try {
      localStorage.setItem('ideas', JSON.stringify(ideas));
    } catch (error) {
      console.error("Error stringifying ideas to localStorage", error);
    }
  }, [ideas]);

  useEffect(() => {
    try {
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
      console.error("Error stringifying projects to localStorage", error);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('backlogItems', JSON.stringify(backlogItems));
    } catch (error) {
      console.error("Error stringifying backlogItems to localStorage", error);
    }
  }, [backlogItems]);

  return (
    <AppContext.Provider value={{ ideas, setIdeas, projects, setProjects, backlogItems, setBacklogItems }}>
      <Router>
        <div className="App">
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/ideas" element={<FutureIdeasView />} />
              <Route path="/projects" element={<ProjectsView />} />
              <Route path="/backlog" element={<BacklogView />} />
              <Route path="/gantt" element={<GanttView />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;

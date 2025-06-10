import React, { useContext, useState } from 'react';
import { CSVLink } from 'react-csv';
import { AppContext } from './AppContext';
import { generateUniqueId } from './utils';
// import './FutureIdeasView.css'; // Styles are now primarily global in App.css

function FutureIdeasView() {
  const { ideas, setIdeas, projects, setProjects } = useContext(AppContext);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null); // ID of the idea being edited
  const [formData, setFormData] = useState({}); // For both new and editing ideas
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const initialNewIdeaState = {
    id: '',
    projectName: '',
    problem: '',
    solution: '',
    champion: '',
    sponsor: '',
    status: 'New', // Default status
    estCost: '',
    costHorizon: '',
    timeHorizon: '',
    perceivedValue: '',
    effort: '',
    confidence: '',
    pitchDeckLink: ''
  };

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Start adding a new idea
  const handleAddNewIdea = () => {
    setFormData(initialNewIdeaState);
    setIsAdding(true);
    setEditingId(null); // Not editing when adding
  };

  // Start editing an existing idea
  const handleEdit = (idea) => {
    setFormData({ ...idea });
    setEditingId(idea.id);
    setIsAdding(false); // Not adding when editing
  };

  // Save new or edited idea
  const handleSave = () => {
    if (editingId) { // Editing existing idea
      setIdeas(ideas.map(idea => idea.id === editingId ? { ...formData, id: editingId } : idea));
    } else { // Adding new idea
      const newIdea = { ...formData, id: generateUniqueId() };
      setIdeas([...ideas, newIdea]);
    }
    setEditingId(null);
    setIsAdding(false);
    setFormData({}); // Clear form
  };

  // Cancel adding/editing
  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({}); // Clear form
  };

  // Remove an idea
  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      setIdeas(ideas.filter(idea => idea.id !== id));
    }
  };

  const renderIdeaRow = (idea) => {
    const isEditingThisRow = editingId === idea.id && !isAdding;

    if (isEditingThisRow) {
      return (
        <tr key={idea.id}>
          <td><input type="text" name="projectName" value={formData.projectName} onChange={handleInputChange} /></td>
          <td><input type="text" name="problem" value={formData.problem} onChange={handleInputChange} /></td>
          <td><input type="text" name="solution" value={formData.solution} onChange={handleInputChange} /></td>
          <td><input type="text" name="champion" value={formData.champion} onChange={handleInputChange} /></td>
          <td><input type="text" name="sponsor" value={formData.sponsor} onChange={handleInputChange} /></td>
          <td>
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="On Hold">On Hold</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </td>
          <td><input type="number" name="estCost" value={formData.estCost} onChange={handleInputChange} /></td>
          <td><input type="text" name="costHorizon" value={formData.costHorizon} onChange={handleInputChange} /></td>
          <td><input type="text" name="timeHorizon" value={formData.timeHorizon} onChange={handleInputChange} /></td>
          <td><input type="number" name="perceivedValue" value={formData.perceivedValue} onChange={handleInputChange} /></td>
          <td><input type="number" name="effort" value={formData.effort} onChange={handleInputChange} /></td>
          <td><input type="number" name="confidence" value={formData.confidence} onChange={handleInputChange} min="0" max="100" /></td>
          <td><input type="text" name="pitchDeckLink" value={formData.pitchDeckLink} onChange={handleInputChange} /></td>
          <td>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </td>
        </tr>
      );
    }

    return (
      <tr key={idea.id}>
        <td>{idea.projectName}</td>
        <td>{idea.problem}</td>
        <td>{idea.solution}</td>
        <td>{idea.champion}</td>
        <td>{idea.sponsor}</td>
        <td>{idea.status}</td>
        <td>{idea.estCost}</td>
        <td>{idea.costHorizon}</td>
        <td>{idea.timeHorizon}</td>
        <td>{idea.perceivedValue}</td>
        <td>{idea.effort}</td>
        <td>{idea.confidence}</td>
        <td>{idea.pitchDeckLink ? <a href={idea.pitchDeckLink} target="_blank" rel="noopener noreferrer">Link</a> : 'N/A'}</td>
        <td>
          <button onClick={() => handleEdit(idea)} className="btn btn-edit">Edit</button>
          <button onClick={() => handleRemove(idea.id)} className="btn btn-remove">Remove</button>
          <button onClick={() => promoteIdeaToProject(idea.id)} className="btn btn-promote">Promote</button>
        </td>
      </tr>
    );
  };

  const promoteIdeaToProject = (ideaId) => {
    const ideaToPromote = ideas.find(idea => idea.id === ideaId);
    if (!ideaToPromote) {
      console.error("Idea not found for promotion:", ideaId);
      return;
    }

    const newProject = {
      ...ideaToPromote, // Copy all properties from the idea
      startDate: null,
      endDate: null,
      assignedTeams: [],
      status: "Planned", // Default status for new projects
      // id remains the same as the original idea's id
    };

    setProjects([...projects, newProject]);
    setIdeas(ideas.filter(i => i.id !== ideaId));
    console.log(`Idea "${ideaToPromote.projectName}" promoted to Projects.`);
    // alert(`Idea "${ideaToPromote.projectName}" promoted to Projects.`); // Optional: for more visible feedback
  };

  const renderAddIdeaForm = () => (
    // Using future-ideas-view td input styles from App.css for specific input sizing in table
    <tr className="inline-form-area">
      <td><input type="text" name="projectName" placeholder="Project Name" value={formData.projectName} onChange={handleInputChange} /></td>
      <td><input type="text" name="problem" placeholder="Problem" value={formData.problem} onChange={handleInputChange} /></td>
      <td><input type="text" name="solution" placeholder="Solution" value={formData.solution} onChange={handleInputChange} /></td>
      <td><input type="text" name="champion" placeholder="Champion" value={formData.champion} onChange={handleInputChange} /></td>
      <td><input type="text" name="sponsor" placeholder="Sponsor" value={formData.sponsor} onChange={handleInputChange} /></td>
      <td>
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="New">New</option>
          <option value="In Review">In Review</option>
          <option value="On Hold">On Hold</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
      <td><input type="number" name="estCost" placeholder="Est. Cost" value={formData.estCost} onChange={handleNumericInputChange} /></td>
      <td><input type="text" name="costHorizon" placeholder="Cost Horizon" value={formData.costHorizon} onChange={handleInputChange} /></td>
      <td><input type="text" name="timeHorizon" placeholder="Time Horizon" value={formData.timeHorizon} onChange={handleInputChange} /></td>
      <td><input type="number" name="perceivedValue" placeholder="Value (1-10)" value={formData.perceivedValue} onChange={handleNumericInputChange} /></td>
      <td><input type="number" name="effort" placeholder="Effort" value={formData.effort} onChange={handleNumericInputChange} /></td>
      <td><input type="number" name="confidence" placeholder="Confidence %" value={formData.confidence} onChange={handleNumericInputChange} min="0" max="100" /></td>
      <td><input type="url" name="pitchDeckLink" placeholder="Pitch Deck URL" value={formData.pitchDeckLink} onChange={handleInputChange} /></td>
      <td>
        <button onClick={handleSave} className="btn btn-save">Save Idea</button>
        <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
      </td>
    </tr>
  );

  // Specific handler for numeric inputs
  const handleNumericInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === '' ? '' : parseFloat(value) }));
  };

  // Generic input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <span className="sort-indicator">🔼</span> : <span className="sort-indicator">🔽</span>;
    }
    return <span className="sort-indicator"></span>; // Keep space for alignment if needed
  };

  let processedIdeas = ideas.filter(idea =>
    (idea.projectName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (idea.champion?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (idea.status?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  if (sortConfig.key) {
    processedIdeas.sort((a, b) => {
      // Ensure 'a' and 'b' have the key and are not null/undefined
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (valA == null && valB == null) return 0;
      if (valA == null) return sortConfig.direction === 'ascending' ? -1 : 1; // or 1 if you want nulls last
      if (valB == null) return sortConfig.direction === 'ascending' ? 1 : -1; // or -1

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortConfig.direction === 'ascending' ? valA - valB : valB - valA;
      }
      // Fallback for string comparison
      if (valA.toString().toLowerCase() < valB.toString().toLowerCase()) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (valA.toString().toLowerCase() > valB.toString().toLowerCase()) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const csvHeaders = [
    { label: "Project Name", key: "projectName" },
    { label: "Problem", key: "problem" },
    { label: "Solution", key: "solution" },
    { label: "Champion", key: "champion" },
    { label: "Sponsor", key: "sponsor" },
    { label: "Status", key: "status" },
    { label: "Estimated Cost", key: "estCost" },
    { label: "Cost Horizon", key: "costHorizon" },
    { label: "Time Horizon", key: "timeHorizon" },
    { label: "Perceived Value", key: "perceivedValue" },
    { label: "Effort", key: "effort" },
    { label: "Confidence", key: "confidence" },
    { label: "Pitch Deck Link", key: "pitchDeckLink" }
  ];

  return (
    <div className="future-ideas-view">
      <h2>Future Ideas</h2>
      <input
        type="text"
        placeholder="Filter by name, champion, or status..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // style will be handled by .filter-input class in App.css
      />
      <button onClick={handleAddNewIdea} className="btn btn-add" disabled={isAdding || editingId}>Add New Idea</button>
      <CSVLink
        data={processedIdeas}
        headers={csvHeaders}
        filename={"future_ideas_export.csv"}
        className="csv-export-button" // Added a class for potential styling
        target="_blank"
      >
        Export to CSV
      </CSVLink>

      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('projectName')}>Project Name{getSortIndicator('projectName')}</th>
            <th>Problem</th>
            <th>Solution</th>
            <th onClick={() => requestSort('champion')}>Champion{getSortIndicator('champion')}</th>
            <th>Sponsor</th>
            <th onClick={() => requestSort('status')}>Status{getSortIndicator('status')}</th>
            <th>Est. Cost</th>
            <th>Cost Horizon</th>
            <th>Time Horizon</th>
            <th onClick={() => requestSort('perceivedValue')}>Value{getSortIndicator('perceivedValue')}</th>
            <th onClick={() => requestSort('effort')}>Effort{getSortIndicator('effort')}</th>
            <th onClick={() => requestSort('confidence')}>Confidence{getSortIndicator('confidence')}</th>
            <th>Pitch Deck</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isAdding && renderAddIdeaForm()}
          {processedIdeas.length > 0 ? (
            processedIdeas.map(renderIdeaRow)
          ) : (
            !isAdding && <tr><td colSpan="14">No ideas match your criteria or none captured yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FutureIdeasView;

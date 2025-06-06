import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Divisions.css'; // Ensure this file exists and matches your styling

const DivisionsView = () => {
  const [divisions, setDivisions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // <-- Add this

  useEffect(() => {
    const fetchDivisions = async () => {
      const token = localStorage.getItem('participantAccessToken');
      if (!token) {
        setError('No access token found.');
        return;
      }

      try {
        const response = await axios.get('https://aqueous-caverns-75509-5acc57c13eba.herokuapp.com/Divisions/partview', {
          headers: {
            participantAccessToken: token,
          },
        });
        setDivisions(response.data);
      } catch (err) {
        console.error('Error fetching division data:', err);
        setError('Failed to load divisions. Please try again.');
      }
    };

    fetchDivisions();
  }, []);

  const handleViewParticipants = () => {
    navigate('/ParticipentsView');
  };
  const handleViewBrackets = () => {
    navigate('/ParticipentBracket');
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Your Divisions</h1>
        <p>These are the divisions you’re registered in.</p>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="dashboard-container">
        {divisions.map((division, index) => (
          <div className="card" key={index}>
            <div className="card-title">
              {division.division_name || `${division.age_group} - ${division.proficiency_level}`}
            </div>
            <div className="card-content">
              <p><strong>Gender:</strong> {division.gender || 'N/A'}</p>
              <p><strong>Age Group:</strong> {division.age_group}</p>
              <p><strong>Proficiency Level:</strong> {division.proficiency_level}</p>
              <p><strong>Category:</strong> {division.category}</p>
              <button className="btn btn-primary" onClick={handleViewParticipants}>
          View All Participants
        </button>
        <button className="btn btn-primary" onClick={handleViewBrackets}>
          View All Brackets
        </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DivisionsView;


import React, { useState, useEffect } from 'react'; // <== added useEffect
import axios from 'axios';
import './Brackets.css';
import { useLocation, useNavigate } from 'react-router-dom';

const TournamentBracket = () => {
  const [bracketData, setBracketData] = useState([]);
  const [bracketCount, setBracketCount] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const division_id = queryParams.get('division_id') || '';
  const navigate = useNavigate();

  const generateBracket = async () => {
    if (!division_id) {
      console.error('No division_id provided.');
      return;
    }

    try {
      await axios.post('https://aqueous-caverns-75509-5acc57c13eba.herokuapp.com/brackets', { division_id });
    } catch (error) {
      console.error('Error making Axios call:', error);
    }

    try {
      const response = await axios.get("https://aqueous-caverns-75509-5acc57c13eba.herokuapp.com/brackets", {
        params: { division_id },
      });

      let fetchedBrackets = response.data;
      fetchedBrackets = fetchedBrackets.sort((a, b) => a.bracket_id - b.bracket_id);

      const newBrackets = fetchedBrackets.map((bracket) => ({
        bracket_id: bracket.bracket_id,
        user1: bracket.user1 || 'Bye',
        user2: bracket.user2 || 'Bye',
        score1: bracket.points_user1 || 0,
        score2: bracket.points_user2 || 0,
        winner: bracket.winner,
        round: bracket.round,
      }));

      setBracketData(newBrackets);
      setBracketCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error fetching brackets from backend:', error);
    }
  };

  useEffect(() => {
    generateBracket(); // Auto-fetch on load
  }, [division_id]); // Only re-run if division_id changes

  const clearBrackets = () => {
    setBracketData([]);
    setBracketCount(0);
  };

  const rounds = bracketData.reduce((acc, bracket) => {
    (acc[bracket.round] = acc[bracket.round] || []).push(bracket);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-3">
       <h1>Brackets</h1>
      </div>

      {Object.keys(rounds).length > 0 ? (
        <div className="bracket-container">
          {Object.keys(rounds).sort().map((roundNumber) => (
            <div key={roundNumber} className="bracket-column">
              <h5 className="text-center mb-2">Round {roundNumber}</h5>
              {rounds[roundNumber].map((bracket, idx) => (
                <div key={idx} style={{ minHeight: '130px' }}>
                  <div className="card shadow-sm bracket-card">
                    <div className="card-body p-2">
                      <div className={`py-2 ${bracket.winner === 'user1' ? 'bg-success text-white' : ''}`}>
                        {bracket.user1} <span className="badge bg-light text-dark ms-1">{bracket.score1}</span>
                      </div>
                      <hr className="my-1" />
                      <div className={`py-2 ${bracket.winner === 'user2' ? 'bg-success text-white' : ''}`}>
                        {bracket.user2} <span className="badge bg-light text-dark ms-1">{bracket.score2}</span>
                      </div>
                      <button
                        className="btn btn-success mt-2"
                        onClick={() => navigate(`/PointTracker?bracket_id=${bracket.bracket_id}`)}
                      >
                        Select 🎯
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No brackets to display. Click 'Show Brackets' to fetch data.</p>
        </div>
      )}
    </div>
  );
};

export default TournamentBracket;

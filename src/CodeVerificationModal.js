import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const CodeVerificationModal = ({ showModal, handleClose, participantId }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
   const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setError('Code cannot be empty.');
      return;
    }

    try {
        console.log(participantId);
      const response = await axios.post('https://aqueous-caverns-75509-5acc57c13eba.herokuapp.com/participants/code', {
        code,
        participant_id: participantId,
      });
      const { token } = response.data;

      // Save token to local storage
      localStorage.setItem('participantAccessToken', token);

      // Clear error and close modal
      setError('');
      handleClose();
      navigate('/TournamentView');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Verify Email Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">Verification Code:</label>
            <input
              type="text"
              id="code"
              className="form-control"
              value={code}
              onChange={handleInputChange}
              placeholder="Enter the 6-digit code"
            />
            {error && <div className="text-danger mt-2">{error}</div>}
          </div>
          <Button type="submit" variant="primary">
            Verify Code
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CodeVerificationModal;
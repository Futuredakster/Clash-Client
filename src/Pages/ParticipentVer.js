import React, { useState } from "react";
import axios from "axios";
import CodeVerificationModal from "../CodeVerificationModal"; // Ensure this path is correct

const ParticipentVer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [participantId, setParticipantId] = useState(null);

  const handleVerify = async () => {
    try {
      console.log("Email being sent to backend:", email); // Log the email

      const response = await axios.post("https://aqueous-caverns-75509-5acc57c13eba.herokuapp.com/participants/auth", { email });

      console.log("Backend response:", response.data); // Log the response data
      setParticipantId(response.data.participant_id); // Set the participant ID

      if (response.data.participant_id) {
        console.log("Participant ID set:", response.data.participant_id);
      } else {
        console.log("No participant ID received.");
      }

      setMessage("Email successfully sent");
      setShowModal(true);
    } catch (error) {
      console.error("Error during verification:", error); // Log any errors

      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="loginContainer">
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button onClick={handleVerify}>Verify Email</button>

      {message && <p>{message}</p>}

      <CodeVerificationModal
        showModal={showModal}
        handleClose={handleCloseModal}
        participantId={participantId} // Pass the ID
      />
    </div>
  );
};

export default ParticipentVer;


import axios from "axios";
import Identity from "../FormComponents/Identity";
import Password from "../FormComponents/Password";
import Credantials from "../FormComponents/Credantials";
import "../Form.css";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';

function CreateUsers(){
  const {authState, setAuthState} = useContext(AuthContext);
  const navigate = useNavigate();
    const [pages, setPages] = useState(0);
    const [info, setInfo] = useState({
        email: "",
        password_hash: "",
        username: "",
        account_id: authState.id
      });

    const FormTitles = ["Identity", "Credntials", "Password"];

    const PageDisplay = () => {
        if (pages === 0) {
          return <Credantials info={info} setInfo={setInfo} />;
        } else if (pages === 1) {
          return <Password info={info} setInfo={setInfo} />;
        } else {
          return <Identity info={info} setInfo={setInfo} />;
        }
      };

    return (

        <div className="form">
        <div className="progressbar">
          <div
            style={{ width: pages === 0 ? "33.3%" : pages == 1 ? "66.6%" : "100%" }}
          ></div>
        </div>
        <div className="form-container">
          <div className="header">
          <h1>{FormTitles[pages]}</h1>
          </div>
          <div className="body">{PageDisplay()}</div>
          <div className="footer">
            <button
              disabled={pages == 0}
              onClick={() => {
                setPages((currPage) => currPage - 1);
              }}
            >
              Prev
            </button>
            <button
  onClick={() => {
    if (pages === FormTitles.length - 1) {
      const accessToken = localStorage.getItem("accessToken");
      axios.post("http://localhost:3001/users", info, {
        headers: {
            accessToken:accessToken,
        }
    })
    .then((response) => {
        navigate('/Home');
        console.log("Request successful:", response);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
} else {
    setPages((currPage) => currPage + 1);
}
}}
>
  {pages === FormTitles.length - 1 ? "Submit" : "Next"}
</button>

          </div>
        </div>
      </div>
   )
};
export default CreateUsers;

import axios from "axios";
import Identity from "../FormComponents/Identity";
import Password from "../FormComponents/Password";
import Credantials from "../FormComponents/Credantials";
import AccountDescript from "../FormComponents/AccountDescript";
import AccountName from "../FormComponents/AccountName";
import AccountType from "../FormComponents/AccountType";
import "../Form.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AccountUser = () =>{
    const navigate = useNavigate();
    const [pages, setPages] = useState(0);
    const [info, setInfo] = useState({
        account_type: "",
        account_name: "",
        account_description: "",
        email: "",
        password_hash: "",
        username: ""
      });

      const FormTitles = ["Account Type","Account Name","Account Description","Identity", "Credntials", "Password"];

      const PageDisplay = () => {
        if (pages === 0) {
          return <AccountType info={info} setInfo={setInfo} />;
        } else if (pages === 1) {
          return <AccountName info={info} setInfo={setInfo} />;
        } else if(pages === 2) {
          return <AccountDescript info={info} setInfo={setInfo} />;
        } else if(pages === 3){
            return <Credantials info={info} setInfo={setInfo} />;
        } else if(pages=== 4){
          return <Identity info={info} setInfo={setInfo} />;
        } else {
          return <Password info={info} setInfo={setInfo} />;
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

        var postData = { 
            account:{
                account_type:info.account_type,
                account_name:info.account_name,
                account_description:info.account_description,
            }, 
            user:{
                email:info.email,
                password_hash:info.password_hash,
                username:info.username,
            } 
        }
        console.log(postData);
        axios.post("https://aqueous-caverns-75509-5acc57c13eba.herokuapp.com/accounts/user", postData)
        .then((response) => {
            navigate('/Login');
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
    );
}
export default AccountUser;
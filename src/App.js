import Home from './Pages/Home';
import CreateUsers from './Pages/CreateUsers';
import Login from './Pages/Login';
import Leftbar from './Leftbar';
import LandingPage from './Pages/LandingPage';
import Tolpbar from './Tolpbar';
import CreateTournaments from './Pages/CreateTournaments';
import MyTournaments from './Pages/MyTournaments';
import AccountUser from './Pages/AccountUser';
import CompetitorView from './ParticipantView/CompetitorView';
import CreateDivision from './Pages/CreateDivision';
import SeeDivisions from './Pages/SeeDivisions';
import DisplayParticipents from './ParticipantView/DisplayParticipents';
import EditUser from './Pages/EditUser';
import SeeParticepents from './Pages/SeeParticepents';
import ForgotPass from './Pages/ForgotPass';
import { ParticipentForm } from './ParticipantView/ParticipentForm';
import { Divisions } from './ParticipantView/Divisions';
import {AuthContext} from './helpers/AuthContext';
import { RecoverPassword } from './RecoverPassword';
import BracketApp from './Brackets/BracketApp';
import PointTracker from './Brackets/PointTracker';
import ParticipentVer from './Pages/ParticipentVer';
import TournamentView from './ParticipantView/TournamentView';
import DivisionsView from './ParticipantView/DivisionsView';
import ParticipentsView from './ParticipantView/ParticipentsView';
import ParticipentBracket from './ParticipantView/ParticipentBracket';
import WatchPage from './Streaming/WatchPage';
import CreateStream from './Streaming/CreateStream';
import GetViewerToken from './Streaming/GetViewerToken';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';

const accessToken = localStorage.getItem("accessToken");

function App() {
const [authState, setAuthState] = useState({username:"", id:0, status:false,accoint_id:0});
const [props, setProps] = useState([]);
const [division,setDivision] = useState([]);

console.log(props);

axios.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem('participantAccessToken');
      window.location.href = '/PraticipentVer'; // or use navigate() if you want SPA behavior
    }
    return Promise.reject(error);
  }
);


useEffect(() => {
  console.log("firing api");
  if (!accessToken) {
    // Handle the case where there is no access token (e.g., redirect to login page)
    setAuthState({...authState, status:false});
  } else{
  axios.get("https://aqueous-caverns-75509-5acc57c13eba.herokuapp.com/users/auth", {
    headers: {
      accessToken: accessToken,
    },
  })
    .then((response) => {
      console.log("got a response", response);
      if (response.data.error) {
        setAuthState({...authState, status:false});
      } else {
        console.log(response.data.username);
        console.log(response.data.account_id)
        setAuthState({username:response.data.username, id:response.data.id, status:true,account_id:response.data.account_id});
      }
    });
  }
},[]); 


  return (
   <div className="container-fluid">
    <Router>
    <AuthContext.Provider value={{authState, setAuthState}}>
    <div className='row flex-nowrap'>
    <Tolpbar/>
    </div>
    <div className='row flex-nowrap'>
    {authState.status ?(
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">    
            <Leftbar />
      </div>
    ) : null}
      <div className='col'>
        <Routes>
        <Route path='/Login' exact element ={<Login/>} />
          <Route path='/CreateUsers' exact element ={<CreateUsers/>} />
          <Route path='/' element={!accessToken ? <Navigate to="/LandingPage" /> : <Navigate to="/Home" />} />
          <Route path='/AccountUser' exact element ={<AccountUser/>} />
          <Route path='/CompetitorView' exact element = {<CompetitorView setProps={setProps} />} />
          <Route path='/LandingPage' exact element ={<LandingPage/>} />
          <Route path='/CreateTournaments' exact element ={<CreateTournaments/>} />
          <Route path ='SeeParticepents' exact element= {<SeeParticepents/>} />
          <Route path='/MyTournaments' exact element= {<MyTournaments />} />
          <Route path='EditUser' exact element= {<EditUser/>} />
          <Route path='/Home' exact element={<Home  />} />
          <Route path='/CreateDivision' exact element={<CreateDivision/>} />
          <Route path='/seeDivisions' exact element={<SeeDivisions/>} />
          <Route path='/Divisions' exact element={<Divisions props={props} setProps={setProps} setDivision={setDivision}/>} />
          <Route path ='/Form' exact element ={<ParticipentForm division={division} />} />
          <Route path ='DisplayParticipents' exact element = {<DisplayParticipents/>} />
          <Route path ='RecoverPassword' exact element = {<RecoverPassword/>} />
          <Route path ='ForgotPass' exact element = {<ForgotPass/>} />
          <Route path ='BracketApp' exact element = {<BracketApp/>} />
          <Route path ='PointTracker' exact element= {<PointTracker/>} />
          <Route path ='ParticipetnVer' exact element = {<ParticipentVer/>} />
          <Route path ='TournamentView' exact element = {<TournamentView/>} />
          <Route path ='DivisionsView' exact element = {<DivisionsView/>} />
          <Route path ='ParticipentsView' exact element = {<ParticipentsView/>} />
          <Route path ='ParticipentBracket' exact element = {<ParticipentBracket/>} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/stream" element={<CreateStream />} />
          <Route path ="/viewer" element={<GetViewerToken/>} />
        </Routes>
      </div>

    </div>
  
    </AuthContext.Provider> 
    </Router>
    </div>
      );
    }
    export default App;
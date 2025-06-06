import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Searchbar from '../Searchbar';
import TableContent from '../TableContent';
import {AuthContext} from '../helpers/AuthContext';



function Home() {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState('')
  const {authState, setAuthState} = useContext(AuthContext);
  console.log("test",authState.acoount_id);
 
  useEffect(() => {
    // Check if accessToken exists in localStorage
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // Handle the case where accessToken is not available
      console.error('Access token not found. API request not made.');
      return;
    }
  
    // Fetch data from the backend API
    axios.get('https://aqueous-caverns-75509-5acc57c13eba.herokuapp.com/tournaments', {
      headers: {
        accessToken: accessToken,
      },
      params: {
        tournament_name: search,
      },
    })
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(authState.id);
          setData(response.data);
        
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [search]);

  


  return (

    <div>
      <Searchbar
      search={search}
      setSearch={setSearch}
      />
      <TableContent
        items={data}
        accountId={authState.account_id}
      />
    </div>
  );
}

export default Home;
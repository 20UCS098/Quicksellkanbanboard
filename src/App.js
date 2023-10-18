import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Header from './component/Header/Header';
import MainDisplay from './component/Display/MainDisplay';

function App() {
  const url = "https://api.quicksell.co/v1/internal/frontend-assignment";
  const [payload, setPayload]= useState([]);

  const fetchInfo =async () => { 
    return fetch(url)  // fetch the data from url code 
            .then((res) => res.json()) //parse to json
            .then((data) => {
              // console.log(data);
              modifyData(data);
            })
  }

  function modifyData(data){
    const newData=[];
    // console.log(data.tickets);
    data.tickets.forEach(ticket => {
      data.users.forEach(user => {
        if(ticket.userId===user.id){
          newData.push({...ticket, "name": user.name, "available": user.available});
        
        }
      });
    });
    setPayload(newData);
  }

  useEffect(() => {
    fetchInfo();
  }, [])
  return (
    <div className="App">
      {/* <Header/> */}
      {payload.length!==0 && (
        <MainDisplay data={payload} />
      )}
    </div>
  );
}

export default App;

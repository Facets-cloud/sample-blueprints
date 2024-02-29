import axios from "axios";
import { useEffect, useState } from "react";
const apiUrl = 'http://localhost:5000';

const GetAllUser = () => {
  const [users, setAllUser] = useState();
  useEffect(() => {
    axios
      .get(`${apiUrl}/users`)
      .then((response) => {
        setAllUser(response.data);
        console.log(import.meta.env)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const deleteUser = async (userId) => {
    if(userId) {   
        fetch(`${apiUrl}/users/${userId}`, {
           method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            axios
            .get(`${apiUrl}/users`)
            .then((response) => {
              setAllUser(response.data);
            })
            .catch((err) => {
              console.error(err);
            });
        });
    } else {
      window.alert('information missing')
    }  
  }
    return (
      <>
        <h1 style={{marginLeft: '1rem'}}>All Users</h1>
        <ul>
        {users && users.map(user => 
          <li key={user.id}>
            <div style={{display: 'flex', height: '3rem', alignItems: 'center'}}>
                <h3>ID: {user?.id} </h3>
                <button style={{ marginLeft: '2rem' }} type="button" onClick= {()=>deleteUser(user?.id)}>Delete</button>
            </div>    
            name: {user?.name} <br></br>
            email: {user?.email} <br></br>
          </li>
        )}
        </ul>
        
      </>
      );
  };
  
  export default GetAllUser;
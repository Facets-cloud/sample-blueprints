import axios from "axios";
import { useState } from "react";
const apiUrl = 'http://localhost:5000';

const PostUser = () => {
  
    const [user, setUser] = useState({
      name: '',
      email: '',
    })
    const createUser = async () => {
      if(user?.email && user?.name) {   
        await axios
        .post(`${apiUrl}/users/create`, 
        user,
        {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response) => {
            setUser({      
            name: '',
            email: '',
            })
            console.log(response)
            return alert("User Created: " + `${JSON.stringify(response.data, null,4)}`);
            })
        .catch((err) => {
            return alert(err);
        });
      } else {
        window.alert('information missing')
      }  
    }
    const onChangeForm = (e) => {
      if (e.target.name === 'name') {
        setUser({...user, name: e.target.value});
      } else if (e.target.name === 'email') {
        setUser({...user, email: e.target.value});
      }
  }
    return (
      <div style={{marginLeft: '1rem'}}>
          <div>
              <div>
              <h1>Create User</h1>
              <form>
                  <div>
                      <div>
                          <label>Name</label>
                          <input 
                            style={{marginLeft: '1rem'}}
                            type="text" 
                            value={user.name}
                            onChange={(e) => onChangeForm(e)} 
                            name="name" 
                            id="name" 
                            placeholder="Name" 
                          />
                      </div>
                  </div>
                  <div style={{marginTop: '1rem'}}>
                      <div>
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <input 
                            style={{marginLeft: '1rem'}}
                            type="text" 
                            value={user.email}
                            onChange={(e) => onChangeForm(e)} 
                            name="email" id="email" 
                            placeholder="Email" 
                          />
                      </div>
                  </div>
                  <button style={{marginTop: '1rem'}} type="button" onClick= {()=>createUser()}>Create</button>
              </form>
              </div>
          </div>
      </div>
      );
  };
  
  export default PostUser;
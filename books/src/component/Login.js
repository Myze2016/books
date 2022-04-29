import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


function Login()  {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    const login = (event) => {
        event.preventDefault();

        
        
        axios.post('http://localhost/booksclean/public/loginEQS', {email,password}).then(
            res => {
               
                const result = res.data;
               
                if (result=='401') {
                    alert("user not found");
                    
                } else {
                    
                        // Login...
                    axios.defaults.withCredentials = true;
                    alert("login successful");
                    localStorage.setItem('sanctum', JSON.stringify(res.data.access_token))
                 
                    sessionStorage.setItem('token', JSON.stringify(true));
                    sessionStorage.setItem('userToken', res.data.access_token);
                    sessionStorage.setItem('userID', res.data.UserID);
                    window.location.reload(false);
                }
            }
        )
        
    }

   

    const resetInfo = (event) => {
        sessionStorage.setItem('token', JSON.stringify(false));
        sessionStorage.setItem('userType','User');
        sessionStorage.setItem('userID', '1');
        window.location.reload(false);
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <form onSubmit={login}>
                        <div class="col-6 offset-3 mt-5">
                            <div class="col-12">
                                <label class="form-label">Email</label>
                                <input onChange={e => setemail(e.target.value)}  type="text" class="form-control"  placeholder="" aria-label="First email" >
                                </input>
                            </div>
                            <div class="col-12">
                                <label class="form-label">password</label>
                                <input onChange={e => setpassword(e.target.value)}  type="password" class="form-control" placeholder="" aria-label="Last email" >
                                </input>
                            </div>
                            <div class="col-12 mt-5">
                                <button type="submit" class="w-100 btn btn-outline-danger btn-lg">
                                    Login
                                </button>
                                
                            </div>
                            <div class="col-12 mt-2">
                              
              
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
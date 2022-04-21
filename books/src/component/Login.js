import React from 'react';
import { useState } from 'react';
import axios from 'axios';


function Login()  {
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();

    const login = (event) => {
        event.preventDefault();
        axios.post('http://localhost/booksapi/public/login', {Username,Password}).then(
            res => {
                const result = res.data;
           
                if (result.length>0) {
                    alert(result);
                    sessionStorage.setItem('token', JSON.stringify(true));
                    sessionStorage.setItem('userType', res.data[0].UserType);
                    window.location.reload(false);
                } else {
                 alert("user not found");
                }
            }
        )
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <form onSubmit={login}>
                        <div class="col-6 offset-3 mt-5">
                            <div class="col-12">
                                <label class="form-label">Username</label>
                                <input onChange={e => setUsername(e.target.value)}  type="text" class="form-control"  placeholder="" aria-label="First name" >
                                </input>
                            </div>
                            <div class="col-12">
                                <label class="form-label">Password</label>
                                <input onChange={e => setPassword(e.target.value)}  type="text" class="form-control" placeholder="" aria-label="Last name" >
                                </input>
                            </div>
                            <div class="col-12 mt-5">
                                <button type="submit" class="w-100 btn btn-outline-danger btn-lg">
                                    Login
                                </button>
                            </div>
                            <div class="col-12 mt-2">
                                <button type="button" class="w-100 btn btn-outline-primary btn-lg">
                                    Register
                                </button>
              
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
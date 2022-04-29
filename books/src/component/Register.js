import React from 'react';
import { useState } from 'react';
import axios from 'axios';


function Register()  {
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();
    const [Email, setEmail] = useState();

    const login = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost/booksclean/public/registerEQS', {Username,Password,Email}).then(
            res => {
                
                const result = res.data;
                
                alert('Succesfully Registered');
                return;
                
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
                                <input onChange={e => setPassword(e.target.value)}  type="password" class="form-control" placeholder="" aria-label="Last name" >
                                </input>
                            </div>
                            <div class="col-12">
                                <label class="form-label">Email</label>
                                <input onChange={e => setEmail(e.target.value)}  type="text" class="form-control" placeholder="" aria-label="Last name" >
                                </input>
                            </div>
                            <div class="col-12 mt-5">
                                <button type="submit" class="w-100 btn btn-outline-danger btn-lg">
                                    Register
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

export default Register;
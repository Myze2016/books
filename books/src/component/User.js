import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Register from "./Register";
import Login from "./Login";

function User()  {

    const [login, setLogin] = useState(true);

    const loginPanel = () => {
        setLogin(true)
        return;
    };


      const registerPanel = () => {
        setLogin(false)
        return;
      };

    return (
        <div>
            <div class="col-12 mt-5">
                <button type="submit" onClick={loginPanel} class="w-50 btn btn-outline-danger btn-lg">
                    Login
                </button>
                <button type="submit" onClick={registerPanel} class="w-50 btn btn-outline-danger btn-lg">
                    Register
                </button>
            </div>
             {login ?  ( <Login />) : (<Register />)}
        </div>
       
    );
    
}

export default User;

import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useEffect } from 'react';
import {
	useParams,useNavigate,Link
} from "react-router-dom";

function Profile() {
	const [profile, setProfile] = useState({});
	let navigate = useNavigate();
	const [FirstName, setFirstName] = useState();
	const [LastName, setLastName] = useState();
	const [PhoneNo, setPhoneNo] = useState();
	const [MobileNo, setMobileNo] = useState();
	const [Email, setEmail] = useState();
	
	  

	useEffect(()=>{
		const sanctum = JSON.parse(localStorage.getItem('sanctum'));
    
		const headers = {
			accept: 'application/json',
			authorization: 'Bearer '+sanctum,
		} 

		
		axios.defaults.withCredentials = true;
		
		
		const getProfile = async() =>{
		  const UserID = sessionStorage.getItem('userID');
		  
		  const result= await axios.post('http://localhost/booksclean/public/api/userProfile', {UserID}, {headers: headers}).then((res) => {
				
		  		return res.data; 
			}
		  );
		  
		  setFirstName(result[0].FirstName);
		  setLastName(result[0].LastName);
		  setPhoneNo(result[0].PhoneNo);
		  setMobileNo(result[0].MobileNo);
		  setEmail(result[0].Email);
		  setProfile(result[0]);
		  
		  
		};

		
		getProfile();
	},[]);

	const editProfile = (event) => {
		
		event.preventDefault();
		const UserID = sessionStorage.getItem('userID');

		const sanctum = JSON.parse(localStorage.getItem('sanctum'));
    
		const headers = {
			accept: 'application/json',
			authorization: 'Bearer '+sanctum,
		} 

		
		axios.defaults.withCredentials = true;
	
		axios.post('http://localhost/booksclean/public/api/editProfile', {UserID,FirstName,LastName,MobileNo,PhoneNo,Email}, {headers: headers}).then(
		  res => {
		
			navigate('/profile');
		  }
		)
	};

    
    return (
		
      <div class="container">
			<div class="row">
				<div class="col-12">

					<div class="mt-5">
						<h3>My Profile</h3>
						<hr></hr>
					</div>

				<form class="file-upload" onSubmit={editProfile}>
					<div class="row gx-5">

					<div class="col-xxl-8 mb-xxl-0">
						<div class="bg-secondary-soft pt-4 py-5 rounded">
						<h4 class="mb-4 mt-0">Contact detail</h4>
							<div class="row g-3">
								

								<div class="col-md-6">
									<label class="form-label">First Name *</label>
									<input type="text" class="form-control" placeholder="" aria-label="First name" value={FirstName} onChange={e => setFirstName(e.target.value)} >
                  </input>
              	</div>
			
								<div class="col-md-6">
									<label class="form-label">Last Name *</label>
									<input type="text" class="form-control" placeholder="" aria-label="Last name" value={LastName} onChange={e => setLastName(e.target.value)} >
                  </input>
                </div>

								<div class="col-md-6">
									<label class="form-label">Phone number *</label>
									<input type="text" class="form-control" placeholder="" aria-label="Phone number" value={profile.PhoneNo} onChange={e => setPhoneNo(e.target.value)} >
                  </input>
								</div>

								<div class="col-md-6">
									<label class="form-label">Mobile number *</label>
									<input type="text" class="form-control" placeholder="" aria-label="Phone number" value={profile.ContactNo} onChange={e => setMobileNo(e.target.value)} >
                  </input>
								</div>
		
								<div class="col-md-6">
									<label for="inputEmail4" class="form-label">Email *</label>
									<input type="email" class="form-control" id="inputEmail4" value={profile.Email} onChange={e => setEmail(e.target.value)} >
                  </input>
								</div>

								<div class="col-md-6">
									<label class="form-label">Skype *</label>
									<input type="text" class="form-control" placeholder="" aria-label="Phone number" value="Scaralet D" >
                  </input>
								</div>
							</div> 
						</div>
					</div>




			
					<div class="col-xxl-6">
						<div class="bg-secondary-soft px-4 py-5 rounded">
						<h4 class="my-4">Change Password</h4>
							<div class="row g-3">
								
	
								<div class="col-md-6">
									<label for="exampleInputPassword1" class="form-label">Old password *</label>
									<input type="password" class="form-control" id="exampleInputPassword1">
                  </input>
								</div>
						
								<div class="col-md-6">
									<label for="exampleInputPassword2" class="form-label">New password *</label>
									<input type="password" class="form-control" id="exampleInputPassword2">
                  </input>
								</div>
							
								<div class="col-md-12">
									<label for="exampleInputPassword3" class="form-label">Confirm Password *</label>
									<input type="password" class="form-control" id="exampleInputPassword3">
                  </input>
								</div>
							</div>
						</div>
					</div>
				</div> 
				
				<div class="d-md-flex justify-content-md-center text-center">
				
					<button type="submit" class="btn btn-outline-primary btn">Update profile</button>
				</div>
			</form> 
		</div>
	</div>
	</div>
    )
  
}

export default Profile;
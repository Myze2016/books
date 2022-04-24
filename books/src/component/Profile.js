
import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useEffect } from 'react';

function Profile() {
	const [profile, setProfile] = useState({});
  
	
	  

	useEffect(()=>{
		
		
		const getProfile = async() =>{
		  const UserID = sessionStorage.getItem('userID');
		  
		  const result= await axios.post('http://localhost/booksapi/public/profile', {UserID}).then((res) => {
				
		  		return res.data; 
			}
		  );
		  
	
		  setProfile(result[0]);
		};

		
		getProfile();
	},[]);

    
    return (
		
      <div class="container">
			<div class="row">
				<div class="col-12">

					<div class="mt-5">
						<h3>My Profile</h3>
						<hr></hr>
					</div>

				<form class="file-upload">
					<div class="row gx-5">

					<div class="col-xxl-8 mb-xxl-0">
						<div class="bg-secondary-soft pt-4 py-5 rounded">
						<h4 class="mb-4 mt-0">Contact detail</h4>
							<div class="row g-3">
								

								<div class="col-md-6">
									<label class="form-label">First Name *</label>
									<input type="text" class="form-control" placeholder="" aria-label="First name" value={profile.FirstName}>
                  </input>
              	</div>
			
								<div class="col-md-6">
									<label class="form-label">Last Name *</label>
									<input type="text" class="form-control" placeholder="" aria-label="Last name" value={profile.LastName}>
                  </input>
                </div>

								<div class="col-md-6">
									<label class="form-label">Phone number *</label>
									<input type="text" class="form-control" placeholder="" aria-label="Phone number" value="(333) 000 555">
                  </input>
								</div>

								<div class="col-md-6">
									<label class="form-label">Mobile number *</label>
									<input type="text" class="form-control" placeholder="" aria-label="Phone number" value="+91 9852 8855 252">
                  </input>
								</div>
		
								<div class="col-md-6">
									<label for="inputEmail4" class="form-label">Email *</label>
									<input type="email" class="form-control" id="inputEmail4" value="example@homerealty.com">
                  </input>
								</div>

								<div class="col-md-6">
									<label class="form-label">Skype *</label>
									<input type="text" class="form-control" placeholder="" aria-label="Phone number" value="Scaralet D">
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
				
					<button type="button" class="btn btn-outline-primary btn">Update profile</button>
				</div>
			</form> 
		</div>
	</div>
	</div>
    )
  
}

export default Profile;
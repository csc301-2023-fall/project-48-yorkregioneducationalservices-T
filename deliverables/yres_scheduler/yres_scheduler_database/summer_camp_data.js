//Display retrieved data from HTTP response in the 'returned data' element
function displayData(data) {
    document.getElementById("returnedData").innerHTML = data;
}

//Insertion functions start here
//Insert user and display success/failure message
//General format for this function/event handler based on code from https://www.javascript-coder.com/javascript-form/javascript-submit-form-post-method/
function submitUsers(e) {
  e.preventDefault(); //Prevent default html submit form action from happening
   
  var userForm = document.getElementById("user-input");
  var formData = new FormData(userForm); //Retrieve inputted form data	
  var bodyData = new URLSearchParams({
    'username': formData.get('username'),
    'password': formData.get('password')
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", { //Create POST request with inputted data
    method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })  
    
  .then(response => { //Upon receiving response, turn it into a string and call displayData
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
    
  .then((response) => {
    displayData(response);
  })
    
  .catch((err) => {
    console.log("Error: ", err);
  });
}

  
var userForm = document.getElementById("user-input"); //Add this function with an eventlistener on the form element
userForm.addEventListener("submit", submitUsers);

//Insert student and display success/failure message
function submitStudents(e) {
  e.preventDefault();
   
  var studentForm = document.getElementById("student-input");
  var formData = new FormData(studentForm);  
  var bodyData = new URLSearchParams({
    'first_name': formData.get('first_name'),
    'last_name': formData.get('last_name'),
    'SID': formData.get('SID'),
    'grade': formData.get('grade'),
    'gender': formData.get('gender'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/students", {
    method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}

  
var studentForm = document.getElementById("student-input");
studentForm.addEventListener("submit", submitStudents);

//Insert student preference and display success/failure message
function submitPreferences(e) {
  e.preventDefault();
   
  var preferenceForm = document.getElementById("student-preference");
  var formData = new FormData(preferenceForm);  
  var bodyData = new URLSearchParams({
    'first_pref_SID': formData.get('first_pref_SID'),
    'second_pref_SID': formData.get('second_pref_SID'),
    'relationship': formData.get('relationship'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/friendpreferences", {
    method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
    
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var preferenceForm = document.getElementById("student-preference");
preferenceForm.addEventListener("submit", submitPreferences);


//Insert room and display success/failure message
function submitRooms(e) {
  e.preventDefault();
   
  var roomForm = document.getElementById("room-input");
  var formData = new FormData(roomForm);  
  var bodyData = new URLSearchParams({
    'room_num': formData.get('room_num'),
    'room_type': formData.get('room_type'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/rooms", {
    method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var roomForm = document.getElementById("room-input");
roomForm.addEventListener("submit", submitRooms);


//Insert counselor and display success/failure message
function submitCounselors(e) {
  e.preventDefault();
   
  var counselorForm = document.getElementById("counselor-input");
  var formData = new FormData(counselorForm);  
  var bodyData = new URLSearchParams({
    'counselor_firstname': formData.get('counselor_firstname'),
    'counselor_lastname': formData.get('counselor_lastname'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/counselors", {
    method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var counselorForm = document.getElementById("counselor-input");
counselorForm.addEventListener("submit", submitCounselors);



//Select functions start here
//Retrieve stored user data and display it or failure message
function getUsers(e) {
  e.preventDefault();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", { //Get requests are fetched with no body
    method: "GET"
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.json();
  })
      
  .then((response) => {
    displayData(JSON.stringify(response, null, 1));
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var usersRetrieve = document.getElementById("GetUsers");
usersRetrieve.addEventListener("submit", getUsers);


//Retrieve stored student data and display it or failure message
function getStudents(e) {
  e.preventDefault();
   
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/students", {
    method: "GET"
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.json();
  })
      
  .then((response) => {
    displayData(JSON.stringify(response, null, 1));
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var studentsRetrieve = document.getElementById("GetStudents");
studentsRetrieve.addEventListener("submit", getStudents);


//Retrieve stored student preference data and display it or failure message
function getPreferences(e) {
  e.preventDefault();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/friendpreferences", {
    method: "GET"
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.json();
  })
      
  .then((response) => {
    displayData(JSON.stringify(response, null, 1));
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var preferencesRetrieve = document.getElementById("GetPreferences");
preferencesRetrieve.addEventListener("submit", getPreferences);


//Retrieve stored room data and display it or failure message
function getRooms(e) {
  e.preventDefault();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/rooms", {
    method: "GET"
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.json();
  })
      
  .then((response) => {
    displayData(JSON.stringify(response, null, 1));
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var roomsRetrieve = document.getElementById("GetRooms");
roomsRetrieve.addEventListener("submit", getRooms);


//Retrieve stored counselor data and display it or failure message
function getCounselors(e) {
  e.preventDefault();
   
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/counselors", {
    method: "GET"
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.json();
  })
      
  .then((response) => {
    displayData(JSON.stringify(response, null, 1));
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var counselorsRetrieve = document.getElementById("GetCounselors");
counselorsRetrieve.addEventListener("submit", getCounselors);



//Update functions start here
//Update users and display success/failure message
function updateUsers(e) {
  e.preventDefault(); 
   
  var userUpdateForm = document.getElementById("user-update");
  var formData = new FormData(userUpdateForm); //Retrieve inputted form data	
  var bodyData = new URLSearchParams({
    'username': formData.get('usernameUpdate'),
    'password': formData.get('passwordUpdate')
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", {
    method: "PUT",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })  
    
  .then(response => { 
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
    
  .then((response) => {
    displayData(response);
  })
    
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var userUpdateForm = document.getElementById("user-update");
userUpdateForm.addEventListener("submit", updateUsers);


//Update student and display success/failure message
function updateStudents(e) {
  e.preventDefault();
   
  var studentUpdateForm = document.getElementById("student-update");
  var formData = new FormData(studentUpdateForm);  
  var bodyData = new URLSearchParams({
    'first_name': formData.get('first_name_update'),
    'last_name': formData.get('last_name_update'),
    'SID': formData.get('SID_update'),
    'grade': formData.get('gradeUpdate'),
    'gender': formData.get('genderUpdate'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/students", {
    method: "PUT",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var studentUpdateForm = document.getElementById("student-update");
studentUpdateForm.addEventListener("submit", updateStudents);


//Update student preference and display success/failure message
function updatePreferences(e) {
  e.preventDefault();
   
  var preferenceUpdateForm = document.getElementById("student-preference-update");
  var formData = new FormData(preferenceUpdateForm);  
  var bodyData = new URLSearchParams({
    'first_pref_SID': formData.get('first_pref_SID_update'),
    'second_pref_SID': formData.get('second_pref_SID_update'),
    'relationship': formData.get('relationshipUpdate'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/friendpreferences", {
    method: "PUT",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
    
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var preferenceUpdateForm = document.getElementById("student-preference-update");
preferenceUpdateForm.addEventListener("submit", updatePreferences);


//Update room and display success/failure message
function updateRooms(e) {
  e.preventDefault();
   
  var roomUpdateForm = document.getElementById("room-update");
  var formData = new FormData(roomUpdateForm);  
  var bodyData = new URLSearchParams({
    'room_num': formData.get('room_num_update'),
    'room_type': formData.get('room_type_update'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/rooms", {
    method: "PUT",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var roomUpdateForm = document.getElementById("room-update");
roomUpdateForm.addEventListener("submit", updateRooms);


//Update counselor and display success/failure message
function updateCounselors(e) {
  e.preventDefault();
   
  var counselorUpdateForm = document.getElementById("counselor-update");
  var formData = new FormData(counselorUpdateForm);  
  var bodyData = new URLSearchParams({
    'CID': formData.get('CID_update'),
    'counselor_firstname': formData.get('counselor_firstname_update'),
    'counselor_lastname': formData.get('counselor_lastname_update'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/counselors", {
    method: "PUT",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var counselorUpdateForm = document.getElementById("counselor-update");
counselorUpdateForm.addEventListener("submit", updateCounselors);



//Delete functions start here
//Delete users and display success/failure message
function deleteUsers(e) {
  e.preventDefault(); 
   
  var userDeleteForm = document.getElementById("user-delete");
  var formData = new FormData(userDeleteForm); //Retrieve inputted form data	
  var bodyData = new URLSearchParams({
    'username': formData.get('usernameDelete')
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", {
    method: "DELETE",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })  
    
  .then(response => { 
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
    
  .then((response) => {
    displayData(response);
  })
    
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var userDeleteForm = document.getElementById("user-delete");
userDeleteForm.addEventListener("submit", deleteUsers);


//Delete student and display success/failure message
function deleteStudents(e) {
  e.preventDefault();
   
  var studentDeleteForm = document.getElementById("student-delete");
  var formData = new FormData(studentDeleteForm);  
  var bodyData = new URLSearchParams({
    'SID': formData.get('SID_Delete')
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/students", {
    method: "DELETE",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var studentDeleteForm = document.getElementById("student-delete");
studentDeleteForm.addEventListener("submit", deleteStudents);


//Delete student preference and display success/failure message
function deletePreferences(e) {
  e.preventDefault();
   
  var preferenceDeleteForm = document.getElementById("student-preference-delete");
  var formData = new FormData(preferenceDeleteForm);  
  var bodyData = new URLSearchParams({
    'first_pref_SID': formData.get('first_pref_SID_delete'),
    'second_pref_SID': formData.get('second_pref_SID_delete'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/friendpreferences", {
    method: "DELETE",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
    
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var preferenceDeleteForm = document.getElementById("student-preference-delete");
preferenceDeleteForm.addEventListener("submit", deletePreferences);


//Delete room and display success/failure message
function deleteRooms(e) {
  e.preventDefault();
   
  var roomDeleteForm = document.getElementById("room-delete");
  var formData = new FormData(roomDeleteForm);  
  var bodyData = new URLSearchParams({
    'room_num': formData.get('room_num_delete'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/rooms", {
    method: "DELETE",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var roomDeleteForm = document.getElementById("room-delete");
roomDeleteForm.addEventListener("submit", deleteRooms);


//Delete counselor and display success/failure message
function deleteCounselors(e) {
  e.preventDefault();
   
  var counselorDeleteForm = document.getElementById("counselor-delete");
  var formData = new FormData(counselorDeleteForm);  
  var bodyData = new URLSearchParams({
    'CID': formData.get('CID_delete'),
  }).toString();
  
  fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/counselors", {
    method: "DELETE",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    body: bodyData,
  })
      
  .then(response => {
    if (!response.ok) {
      throw new Error('RESPONSE ERROR');
    }
    return response.text();
  })
      
  .then((response) => {
    displayData(response);
  })
      
  .catch((err) => {
    console.log("Error: ", err);
  });
}
  
var counselorDeleteForm = document.getElementById("counselor-delete");
counselorDeleteForm.addEventListener("submit", deleteCounselors);

const API_URL = "http://localhost:5000/api/auth";


// ======================
// REGISTER
// ======================

const registerForm =
document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const nama =
document.getElementById("nama").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const response = await fetch(
`${API_URL}/register`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
nama,
email,
password
})
}
);

const data =
await response.json();

alert(data.message);

window.location.href =
"login.html";

}catch(error){

console.log(error);

alert("Register gagal");

}

});
}



// ======================
// LOGIN
// ======================

const loginForm =
document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const response = await fetch(
`${API_URL}/login`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
}
);

const data =
await response.json();

if(data.token){

localStorage.setItem(
"token",
data.token
);

localStorage.setItem(
"role",
data.role
);

localStorage.setItem(
"nama",
data.nama
);

if(data.role === "admin"){

window.location.href =
"admin-dashboard.html";

}else{

window.location.href =
"user-dashboard.html";

}

}else{

alert(data.message);

}

}catch(error){

console.log(error);

alert("Login gagal");

}

});
}



// ======================
// LOGOUT
// ======================

function logout(){

localStorage.clear();

window.location.href =
"login.html";

}
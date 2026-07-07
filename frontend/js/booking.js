const API =
"http://localhost:5000/api/booking";

const token =
localStorage.getItem("token");

const role =
localStorage.getItem("role");

if(role !== "admin"){

window.location.href =
"login.html";

}


// ======================
// LOAD BOOKING
// ======================

async function loadBooking(){

try{

const response =
await fetch(API,{
headers:{
Authorization:
`Bearer ${token}`
}
});

const data =
await response.json();

let html = "";

data.forEach(item=>{

let badge = "";

if(item.status==="Pending"){

badge =
'<span class="badge bg-warning">Pending</span>';

}
else if(item.status==="Disetujui"){

badge =
'<span class="badge bg-success">Disetujui</span>';

}
else{

badge =
'<span class="badge bg-danger">Ditolak</span>';

}

html += `

<tr>

<td>${item.id}</td>

<td>${item.nama}</td>

<td>${item.nama_lapangan}</td>

<td>${badge}</td>

<td>

<button
class="btn btn-success btn-sm"
onclick="approveBooking(${item.id})">

Approve

</button>

<button
class="btn btn-warning btn-sm"
onclick="rejectBooking(${item.id})">

Reject

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteBooking(${item.id})">

Hapus

</button>

</td>

</tr>

`;

});

document.getElementById(
"bookingTable"
).innerHTML = html;

}catch(error){

console.log(error);

}

}


// ======================
// APPROVE
// ======================

async function approveBooking(id){

try{

await fetch(
`${API}/${id}`,
{
method:"PUT",

headers:{
"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`
},

body:JSON.stringify({
status:"Disetujui"
})
}
);

loadBooking();

}catch(error){

console.log(error);

}

}


// ======================
// REJECT
// ======================

async function rejectBooking(id){

try{

await fetch(
`${API}/${id}`,
{
method:"PUT",

headers:{
"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`
},

body:JSON.stringify({
status:"Ditolak"
})
}
);

loadBooking();

}catch(error){

console.log(error);

}

}


// ======================
// DELETE
// ======================

async function deleteBooking(id){

const konfirmasi =
confirm(
"Yakin hapus booking?"
);

if(!konfirmasi) return;

try{

await fetch(
`${API}/${id}`,
{
method:"DELETE",

headers:{
Authorization:
`Bearer ${token}`
}
}
);

loadBooking();

}catch(error){

console.log(error);

}

}


// ======================
// LOGOUT
// ======================

function logout(){

localStorage.clear();

window.location.href =
"login.html";

}


loadBooking();
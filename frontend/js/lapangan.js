const API =
"http://localhost:5000/api/lapangan";

const token =
localStorage.getItem("token");

const role =
localStorage.getItem("role");


if(role !== "admin"){

window.location.href =
"login.html";

}


// ======================
// GET ALL
// ======================

async function loadLapangan(){

const response =
await fetch(API);

const data =
await response.json();

let html = "";

data.forEach(item=>{

html += `

<tr>

<td>${item.id}</td>

<td>${item.nama_lapangan}</td>

<td>${item.jenis}</td>

<td>
Rp ${item.harga_per_jam}
</td>

<td>${item.status}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick='editLapangan(${JSON.stringify(item)})'>

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick='deleteLapangan(${item.id})'>

Hapus

</button>

</td>

</tr>

`;

});

document.getElementById(
"lapanganTable"
).innerHTML = html;

}


// ======================
// CREATE & UPDATE
// ======================

async function saveLapangan(){

const id =
document.getElementById(
"lapanganId"
).value;

const body = {

nama_lapangan:
document.getElementById(
"nama_lapangan"
).value,

jenis:
document.getElementById(
"jenis"
).value,

harga_per_jam:
document.getElementById(
"harga_per_jam"
).value,

status:
document.getElementById(
"status"
).value

};

if(id){

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

body:JSON.stringify(body)
}
);

}else{

await fetch(
API,
{
method:"POST",

headers:{
"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`
},

body:JSON.stringify(body)
}
);

}

location.reload();

}


// ======================
// EDIT
// ======================

function editLapangan(item){

document.getElementById(
"lapanganId"
).value = item.id;

document.getElementById(
"nama_lapangan"
).value =
item.nama_lapangan;

document.getElementById(
"jenis"
).value =
item.jenis;

document.getElementById(
"harga_per_jam"
).value =
item.harga_per_jam;

document.getElementById(
"status"
).value =
item.status;

const modal =
new bootstrap.Modal(
document.getElementById(
"lapanganModal"
)
);

modal.show();

}


// ======================
// DELETE
// ======================

async function deleteLapangan(id){

const konfirmasi =
confirm(
"Yakin hapus data?"
);

if(!konfirmasi) return;

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

loadLapangan();

}


// ======================
// LOGOUT
// ======================

function logout(){

localStorage.clear();

window.location.href =
"login.html";

}


loadLapangan();
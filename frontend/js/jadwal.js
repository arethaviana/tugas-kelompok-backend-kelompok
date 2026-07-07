const API_JADWAL =
"http://localhost:5000/api/jadwal";

const API_LAPANGAN =
"http://localhost:5000/api/lapangan";

const token =
localStorage.getItem("token");

const role =
localStorage.getItem("role");

if(role !== "admin"){

window.location.href =
"login.html";

}


// =====================
// LOAD LAPANGAN
// =====================

async function loadLapangan(){

const response =
await fetch(API_LAPANGAN);

const data =
await response.json();

let option = "";

data.forEach(item=>{

option += `
<option value="${item.id}">
${item.nama_lapangan}
</option>
`;

});

document.getElementById(
"lapangan_id"
).innerHTML = option;

}


// =====================
// LOAD JADWAL
// =====================

async function loadJadwal(){

const response =
await fetch(API_JADWAL);

const data =
await response.json();

let html = "";

data.forEach(item=>{

html += `

<tr>

<td>${item.id}</td>

<td>${item.nama_lapangan}</td>

<td>${new Date(item.tanggal).toLocaleDateString('id-ID',{
day:'2-digit',
month:'long',
year:'numeric'
})}

<td>${item.jam_mulai}</td>

<td>${item.jam_selesai}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick='editJadwal(${JSON.stringify(item)})'>

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick='deleteJadwal(${item.id})'>

Hapus

</button>

</td>

</tr>

`;

});

document.getElementById(
"jadwalTable"
).innerHTML = html;

}


// =====================
// SAVE
// =====================

async function saveJadwal(){

const id =
document.getElementById(
"jadwalId"
).value;

const body = {

lapangan_id:
document.getElementById(
"lapangan_id"
).value,

tanggal:
document.getElementById(
"tanggal"
).value,

jam_mulai:
document.getElementById(
"jam_mulai"
).value,

jam_selesai:
document.getElementById(
"jam_selesai"
).value

};

if(id){

await fetch(
`${API_JADWAL}/${id}`,
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
API_JADWAL,
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


// =====================
// EDIT
// =====================

function editJadwal(item){

document.getElementById(
"jadwalId"
).value =
item.id;

document.getElementById(
"lapangan_id"
).value =
item.lapangan_id;

document.getElementById(
"tanggal"
).value =
item.tanggal;

document.getElementById(
"jam_mulai"
).value =
item.jam_mulai;

document.getElementById(
"jam_selesai"
).value =
item.jam_selesai;

const modal =
new bootstrap.Modal(
document.getElementById(
"jadwalModal"
)
);

modal.show();

}


// =====================
// DELETE
// =====================

async function deleteJadwal(id){

const konfirmasi =
confirm(
"Yakin hapus jadwal?"
);

if(!konfirmasi) return;

await fetch(
`${API_JADWAL}/${id}`,
{
method:"DELETE",

headers:{
Authorization:
`Bearer ${token}`
}
}
);

loadJadwal();

}


// =====================
// LOGOUT
// =====================

function logout(){

localStorage.clear();

window.location.href =
"login.html";

}


loadLapangan();
loadJadwal();
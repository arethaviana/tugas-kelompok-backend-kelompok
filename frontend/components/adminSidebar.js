function loadAdminSidebar(){

document.getElementById("sidebar").innerHTML = `

<div class="sidebar">

<h3>SportBook</h3>

<a href="admin-dashboard.html">Dashboard</a>
<a href="admin-lapangan.html">Lapangan</a>
<a href="admin-jadwal.html">Jadwal</a>
<a href="admin-booking.html">Booking</a>

<a href="#" onclick="logout()">Logout</a>

</div>

`;

}
function loadUserSidebar(){

document.getElementById("sidebar").innerHTML = `

<div class="sidebar">

<h3>SportBook</h3>

<a href="user-dashboard.html">
🏠 Dashboard
</a>

<a href="lapangan.html">
⚽ Booking Lapangan
</a>

<a href="booking.html">
📖 Riwayat Booking
</a>

<a href="#" onclick="logout()">
🚪 Logout
</a>

</div>

`;

}
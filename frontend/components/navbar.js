function loadNavbar(title){

const nama =
localStorage.getItem("nama") || "User";

document.getElementById("navbar").innerHTML = `

<div class="topbar">

<div class="d-flex justify-content-between align-items-center">

<div>

<h4 class="mb-0">
${title}
</h4>

</div>

<div>

<span class="fw-bold">
👤 ${nama}
</span>

</div>

</div>

</div>

`;

}
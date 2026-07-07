const express = require("express");
const router = express.Router();

const verify =
require("../middleware/auth");

const admin =
require("../middleware/admin");

const jadwal =
require("../controllers/jadwalController");

router.get("/", jadwal.getAll);

router.post(
"/",
verify,
admin,
jadwal.create
);

router.put(
"/:id",
verify,
admin,
jadwal.update
);

router.delete(
"/:id",
verify,
admin,
jadwal.remove
);

module.exports = router;
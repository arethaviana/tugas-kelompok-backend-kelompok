const express = require("express");
const router = express.Router();

const verify =
require("../middleware/auth");

const admin =
require("../middleware/admin");

const lapangan =
require("../controllers/lapanganController");

router.get("/", lapangan.getAll);
router.get("/:id", lapangan.getById);

router.post(
"/",
verify,
admin,
lapangan.create
);

router.put(
"/:id",
verify,
admin,
lapangan.update
);

router.delete(
"/:id",
verify,
admin,
lapangan.remove
);

module.exports = router;
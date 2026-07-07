const express = require("express");
const router = express.Router();

const verify =
require("../middleware/auth");

const admin =
require("../middleware/admin");

const booking =
require("../controllers/bookingController");

router.get(
"/",
verify,
booking.getAll
);

router.post(
"/",
verify,
booking.create
);

router.put(
"/:id",
verify,
admin,
booking.updateStatus
);

router.delete(
"/:id",
verify,
booking.remove
);

module.exports = router;
const express = require('express');
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

const {getPrivateData} = require("../controllers/privateController");
const { cfdAdd, cfdHistorys } = require("../controllers/cfdController");

router.route("/user").get(protect, getPrivateData);
router.route("/cfd/create").post(protect, cfdAdd);
router.route("/cfd/history").get(protect, cfdHistorys);

module.exports = router;

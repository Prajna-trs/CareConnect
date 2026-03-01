const express = require("express");
const router = express.Router();
const careController = require("../controllers/careController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/request", verifyToken, careController.createCareRequest);
router.get("/all", verifyToken, careController.getAllCareRequests);
router.put("/status/:id", verifyToken, careController.updateCareStatus);

module.exports = router;
const express = require("express");
const router = express.Router();

const orphanController = require("../controllers/orphanController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/request", verifyToken, orphanController.createOrphanRequest);
router.get("/all", verifyToken, orphanController.getAllOrphanRequests);
router.put("/status/:id", verifyToken, orphanController.updateOrphanStatus);

module.exports = router;
const db = require("../config/db");

// POST /care/request
exports.createCareRequest = (req, res) => {

  if (req.user.role !== "elder") {
    return res.status(403).json({ message: "Only elders can submit request" });
  }

  const { typeOfHelp, description } = req.body;

  const sql = `
    INSERT INTO care_requests (elderId, typeOfHelp, description)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [req.user.id, typeOfHelp, description], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Care request submitted successfully"
    });
  });
};

// GET /care/all
exports.getAllCareRequests = (req, res) => {

  const sql = `
    SELECT care_requests.*, users.name 
    FROM care_requests
    JOIN users ON care_requests.elderId = users.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

// PUT /care/status/:id
exports.updateCareStatus = (req, res) => {

  if (req.user.role !== "caretaker" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { status } = req.body;

  const sql = `
    UPDATE care_requests
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, req.params.id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    // Logging
    db.query(
      "INSERT INTO logs (userId, action) VALUES (?, ?)",
      [req.user.id, "Updated Care Request Status"]
    );

    res.json({ message: "Status updated successfully" });
  });
};
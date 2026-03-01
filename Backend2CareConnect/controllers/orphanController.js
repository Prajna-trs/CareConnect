const db = require("../config/db");

exports.createOrphanRequest = (req, res) => {

    if (req.user.role !== "orphan") {
        return res.status(403).json({
            message: "Only orphans can submit support request"
        });
    }

    const { supportType, description } = req.body;

    const sql = `
        INSERT INTO orphan_requests (orphanId, supportType, description)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [req.user.id, supportType, description], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        db.query(
            "INSERT INTO logs (userId, action) VALUES (?, ?)",
            [req.user.id, "Submitted Orphan Support Request"]
        );

        res.status(201).json({
            message: "Support request submitted successfully",
            requestId: result.insertId
        });
    });
};

exports.getAllOrphanRequests = (req, res) => {

    // Only NGO & Admin can view
    if (req.user.role !== "ngo" && req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access Denied"
        });
    }

    const sql = `
        SELECT 
            orphan_requests.id,
            users.name AS orphanName,
            orphan_requests.supportType,
            orphan_requests.description,
            orphan_requests.status,
            orphan_requests.created_at
        FROM orphan_requests
        JOIN users ON orphan_requests.orphanId = users.id
        ORDER BY orphan_requests.created_at DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

exports.updateOrphanStatus = (req, res) => {

    if (req.user.role !== "ngo" && req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access Denied"
        });
    }

    const { status } = req.body;
    const requestId = req.params.id;

    const sql = `
        UPDATE orphan_requests
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, requestId], (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        // Logging
        db.query(
            "INSERT INTO logs (userId, action) VALUES (?, ?)",
            [req.user.id, `Updated Orphan Request #${requestId} Status to ${status}`]
        );

        res.json({
            message: "Status updated successfully"
        });
    });
};
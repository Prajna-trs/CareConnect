const express = require("express");
const cors = require("cors");
require("./config/db");   

const app = express();

app.use(cors());
app.use(express.json());


const careRoutes = require("./routes/careRoutes");
app.use("/care", careRoutes);

const orphanRoutes = require("./routes/orphanRoutes");
app.use("/orphan", orphanRoutes);

app.get("/", (req, res) => {
  res.send("Backend 2 Care System Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
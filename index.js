const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/notes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Mengizinkan frontend memanggil API ini
app.use(express.json()); // Mengizinkan express membaca request berbentuk JSON

// Routing
app.use("/", noteRoutes);

// Jalankan Server
app.listen(port, () => {
  console.log(`Server backend berjalan di http://localhost:${port}`);
});

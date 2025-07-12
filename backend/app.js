const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const customerRoutes = require("./routes/customerRoutes");
app.use("/api/customer", customerRoutes);

mongoose.connect("mongodb+srv://nicholasaristiantodev:mongodb@cluster0.pbbgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    mongoose.connection.db.listCollections().toArray((err, names) => {
        if (err) return console.error("❌ Gagal ambil koleksi:", err);
        console.log("📂 Koleksi dalam DB:", names.map(n => n.name));
    });
    app.listen(5000, () => {
        console.log("Server running on http://localhost:5000");
        console.log("Swagger docs on http://localhost:5000/api-docs");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));


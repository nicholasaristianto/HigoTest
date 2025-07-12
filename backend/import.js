const fs = require("fs");
const csv = require("csv-parser");
const Customer = require("./models/customerModel");
const connectDB = require("./config/db");

connectDB();

const BATCH_SIZE = 1000;
let batch = [];

const stream = fs.createReadStream("./Dataset.csv").pipe(csv());

stream.on("data", async (data) => {
  stream.pause();

  batch.push({
    number: parseInt(data.Number),
    nameOfLocation: data.NameofLocation,
    date: data.Date,
    loginHour: data.LoginHour,
    name: data.Name,
    age: parseInt(data.Age),
    gender: data.gender,
    email: data.Email,
    noTelp: data.NoTelp,
    brandDevice: data.BrandDevice,
    digitalInterest: data.DigitalInterest,
    locationType: data.LocationType,
  });

  if (batch.length >= BATCH_SIZE) {
    try {
      await Customer.insertMany(batch, { ordered: false });
      batch = [];
    } catch (err) {
      console.error("Batch insert error:", err.message);
    }
  }

  stream.resume();
});

stream.on("end", async () => {
  if (batch.length > 0) {
    try {
      await Customer.insertMany(batch, { ordered: false });
    } catch (err) {
      console.error("Final batch insert error:", err.message);
    }
  }

  console.log("✅ Import selesai semua data");
  process.exit();
});

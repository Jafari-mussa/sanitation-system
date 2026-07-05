require('dotenv').config(); 

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


console.log("=== ENV CHECK ===");
console.log("CLOUD_NAME:", process.env.CLOUD_NAME || "HAIPO");
console.log("API_KEY:", process.env.API_KEY || "HAIPO");
console.log("API_SECRET:", process.env.API_SECRET ? "IPO" : "HAIPO");


mongoose.connect("mongodb://sanitation_user:Rufiji2005@ac-qmhtjqg-shard-00-00.6fhrb7b.mongodb.net:27017,ac-qmhtjqg-shard-00-01.6fhrb7b.mongodb.net:27017,ac-qmhtjqg-shard-00-02.6fhrb7b.mongodb.net:27017/?ssl=true&replicaSet=atlas-1u79vi-shard-0&authSource=admin&appName=Sanitation")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const upload = multer({ storage: multer.memoryStorage() });




const reportSchema = new mongoose.Schema({
name: String,
region: String,
district: String,
date: String,
problem: String,
rating: String,
image: String,
latitude: String,
longitude: String,
});

const Report = mongoose.model("Report", reportSchema);



app.post("/submit", upload.single("image"), async (req, res) => {

  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    let imageUrl = "";

    if (req.file && req.file.buffer) {

      const uploadImage = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          { folder: "sanitation_system" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);

      });

      imageUrl = uploadImage.secure_url;
    }

    const newReport = new Report({
      name: req.body.name,
      region: req.body.region,
      district: req.body.district,
      date: req.body.date,
      problem: req.body.problem,
      rating: req.body.rating,
      image: imageUrl,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });

    await newReport.save();

    return res.json({
      message: "Data saved successfully"
    });

  } catch (error) {

    console.log("ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});

app.get("/", (req, res) => {
res.send("Sanitation System Backend is Running 🚀");
});
app.get("/reports", async(req,res)=>{

try{

const reports = await Report.find();

res.json(reports);

}catch(error){

res.status(500).json({
error:error.message
});

}

});


const PORT = 5000;



app.listen(PORT, () => {
console.log("Server running on port " + PORT);
});
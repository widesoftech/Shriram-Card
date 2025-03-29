const express = require("express");
const router = express.Router();

const { uploadImageToCloudinary } = require("../utils/imageUploader");

const Template = require("../models/Templates");



// **Upload Image**
router.post("/upload", async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
          return res.status(400).json({ success: false, message: "No file uploaded" });
        }
    
        const file = req.files.image;
    
        // Upload to Cloudinary
        const uploadResponse = await uploadImageToCloudinary(file, "templates");
    
        // Save image URL to database
        const newTemplate = new Template({ image: uploadResponse.secure_url });
        await newTemplate.save();
    
        res.status(201).json({ success: true, data: newTemplate });
      } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ success: false, message: "Image upload failed" });
      }
});

// **Fetch All Images**
router.get("/", async (req, res) => {
    try {
        const images = await Template.find({});
        console.log(images);
                res.json(images);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

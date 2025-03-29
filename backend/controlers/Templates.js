const Template = require("../models/Templates");

const cloudinary = require("cloudinary").v2;

exports.Templates = async (req, res) => {
  try {
    const file = req.body.image;
    const uploadedImage = await cloudinary.uploader.upload(file, {
      folder: "templates/",
    });

    const newTemplate = new Template({
      name: req.body.name,
      image: uploadedImage.secure_url,
    });

    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ error: "Error uploading template" });
  }
};

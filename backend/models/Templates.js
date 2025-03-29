const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
    image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Template", TemplateSchema);

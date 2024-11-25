const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, default: false },
  activeTime: { type: Number, default: 0 },
  image: { type: String, required: true }, // URL or path for the image
});

module.exports = mongoose.model('Appliance', applianceSchema);

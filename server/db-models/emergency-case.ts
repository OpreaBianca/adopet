const mongoose = require('mongoose');

export default mongoose.model('EmergencyCase', {
  name: String,
  phone: String,
  creationDate: Date,
  address: String,
  description: String,
  lat: Number,
  lng: Number,
  takenOverID: String,
  takenOverName: String,
  takenOverPhone: String
});

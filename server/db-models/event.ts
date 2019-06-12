const mongoose = require('mongoose');

export default mongoose.model('Event', {
  name: String,
  organizer: String,
  date: Date,
  location: String,
  address: String,
  description: String,
  creatorID: String,
  image: String
});

const mongoose = require('mongoose');

export default mongoose.model('AdoptionRequest', {
  pet: { type: mongoose.Types.ObjectId, ref: "Pet" },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  adopter: { type: mongoose.Types.ObjectId, ref: "User" },
  requestMessage: String,
  requestStatus: String,
  creationDate: Date
});

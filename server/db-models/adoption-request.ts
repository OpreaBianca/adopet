const mongoose = require('mongoose');

export default mongoose.model('AdoptionRequest', {
  petID: String,
  ownerID: String,
  adopetID: String,
  requestMessage: String
});

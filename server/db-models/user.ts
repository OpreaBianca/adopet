const mongoose = require('mongoose');

export default mongoose.model('User', {
  name: String,
  email: String,
  profile: String,
  phone: String,
  password: String,
  emergencyNotificationOn: Boolean,
  address: String,
  facebook: String,
  twitter: String,
  website: String,
  instagram: String,
  description: String,
  profileImage: String,
  bankName: String,
  bankAccount: String,
  bankAccountName: String,
  paypalAccount: String,
  donationsInfo: String,
  subscription: {}
});
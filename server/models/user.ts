const mongoose = require('mongoose');

export default mongoose.model('User', {
    name: String,
    email: String,
    profile: String,
    phone: String,
    password: String,
    emergencyNotificationOn: Boolean,
    description: String,
    location: String
})
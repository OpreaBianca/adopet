const mongoose = require('mongoose');

export default mongoose.model('Pet', {
    name: String,
    category: String,
    location: [String],
    gender: String,
    ageNumber: Number,
    ageMeasurementUnit: String,
    size: String,
    fitFor: [String],
    goodWith: [String],
    status: String,
    description: String,
    foster: { name: String, email: String, phone: String, otherDetails: String },
    adopter: { name: String, email: String, phone: String, otherDetails: String },
    fosterFormVisibile: Boolean,
    images: [String],
    ownerID: String
});

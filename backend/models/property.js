// Property Model
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    landlordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    propertyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);


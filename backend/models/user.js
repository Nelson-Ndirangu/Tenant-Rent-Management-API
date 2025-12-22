// User model

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true, 
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['LANDLORD', 'TENANT', 'ADMIN'],
        default: 'TENANT'
    },
    createdAt: {    
        type: Date,
        default: Date.now
    },
    updatedAt: {    
        type: Date,
        default: Date.now
    }
},{ timestamps: true});

// Adding index for email addresses
UserSchema.index({ email: 1 });
module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Auth Info
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Personal Info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },

    // Contact Info
    phoneNumber: { type: String, required: true },
    whatsappNumber: { type: String },

    // Location Info
    province: { type: String, required: true },
    district: { type: String, required: true },
    homeAddress: { type: String, required: true },

    // Education Info
    school: { type: String, required: true },

    // Profile Photo (URL එකක් විදිහට සේව් වෙන්නේ)
    profileImage: { type: String, default: "" },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
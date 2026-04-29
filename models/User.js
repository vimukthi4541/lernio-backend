const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    whatsappNumber: { type: String },
    province: { type: String, required: true },
    district: { type: String, required: true },
    homeAddress: { type: String, required: true },
    school: { type: String, required: true },
    profileImage: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});

// Password Hashing Middleware
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        console.error("Bcrypt Error in Model:", err);
        throw err; 
    }
});

module.exports = mongoose.model('User', UserSchema);
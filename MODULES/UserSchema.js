const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    user_name: {
        type: String,
        required: true,
    },
    user_address: {
        type: String,
    },
    user_email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Other fields you want to include in the user schema
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Add createdAt and updatedAt fields
});

// Soft delete method
userSchema.methods.softDelete = async function () {
    this.deleted = true;
    return await this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;

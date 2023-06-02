import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String, 
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userConfirmPassword: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    userImage: {
        type: String
    }
})

const UsersMessage = mongoose.model('Users', usersSchema)

export default UsersMessage
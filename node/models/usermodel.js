import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     minlength: 1
    // },
    name: {
        type:String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true
    },

},{
    timestamps: true
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
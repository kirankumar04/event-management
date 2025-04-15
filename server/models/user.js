const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bookmarks: {
        type: [Schema.Types.ObjectId],
        ref: 'Event', // Change 'events' to 'Event' because it's the model name.
        default: []
    },
    registeredEvents: {
        type: [Schema.Types.ObjectId],
        ref: 'Event', // Change 'events' to 'Event'.
        default: []
    },
    withDrawnEvents: {
        type: [Schema.Types.ObjectId],
        ref: 'Event', // Change 'events' to 'Event'.
        default: []
    }
});

const UserModel = mongoose.model('User', UserSchema); // User model should be 'User' (not 'users')
module.exports = UserModel;

var mongoose = require('mongoose');

const RoomsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        active_users: {
            type: Array,
            default: []
        }
    },
    {
        collection: 'rooms'
    });

export const RoomsModel = mongoose.model('rooms', RoomsSchema);
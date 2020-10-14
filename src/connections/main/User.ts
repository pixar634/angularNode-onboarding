'use strict';

import { Schema } from 'mongoose';


const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true,
        validate: function (email) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },

    last_seen: Date
}, { timestamps: true });

module.exports = db => db.model('User', UserSchema);

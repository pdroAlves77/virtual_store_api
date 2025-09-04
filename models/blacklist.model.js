const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tokenBlacklistSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        expires: '1m' // Tokens will expire after 1 minute
    },
    token: {
        type: String,
        required: true
    }
});

const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
module.exports = TokenBlacklist;
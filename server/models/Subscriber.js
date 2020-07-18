const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
    
}, { timestamps: true })

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber } 
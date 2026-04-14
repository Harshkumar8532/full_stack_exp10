const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    deliveryTime: { type: String, required: true }, // e.g. "30-40 min"
    priceForTwo: { type: Number, required: true },
    cuisines: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    location: { type: String },
    offers: { type: String } // e.g. "50% OFF up to $5"
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);

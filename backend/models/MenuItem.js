const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g. 'Starters', 'Main Course'
    image: { type: String, required: false },
    isVeg: { type: Boolean, default: true },
    tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);

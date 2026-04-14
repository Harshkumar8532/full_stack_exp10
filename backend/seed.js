require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

const restaurantsData = [
  {
    name: "Spice Villa",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop",
    rating: 4.3,
    deliveryTime: "30-40 min",
    priceForTwo: 300,
    cuisines: ["Indian", "North Indian"],
    isPopular: true,
    location: "Delhi",
    offers: "50% OFF up to ₹100"
  },
  {
    name: "Pizza Hub",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop",
    rating: 4.5,
    deliveryTime: "25-30 min",
    priceForTwo: 400,
    cuisines: ["Italian", "Fast Food"],
    isPopular: true,
    location: "Mumbai",
    offers: "Flat ₹125 OFF"
  },
  {
    name: "Burger Point",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop",
    rating: 4.1,
    deliveryTime: "20-25 min",
    priceForTwo: 250,
    cuisines: ["American", "Fast Food"],
    isPopular: false,
    location: "Bangalore",
    offers: "20% OFF"
  },
  {
    name: "Dragon Wok",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop",
    rating: 4.2,
    deliveryTime: "35-40 min",
    priceForTwo: 350,
    cuisines: ["Chinese", "Asian"],
    isPopular: false,
    location: "Pune",
    offers: "Free Delivery"
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food-order')
.then(async () => {
    console.log('Connected to MongoDB. Seeding...');
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    
    // Seed Restaurants
    const createdRestaurants = await Restaurant.insertMany(restaurantsData);
    
    // Seed Menu Items
    const menuItems = [
      {
        restaurant: createdRestaurants[0]._id, // Spice Villa
        name: "Paneer Butter Masala",
        description: "Rich and creamy dish of paneer in a tomato, butter and cashew sauce.",
        price: 220,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop",
        isVeg: true,
        tags: ["Bestseller"]
      },
      {
        restaurant: createdRestaurants[0]._id, // Spice Villa
        name: "Chicken Tikka Masala",
        description: "Roasted marinated chicken chunks in a spiced sauce.",
        price: 310,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b6ae398?w=800&auto=format&fit=crop",
        isVeg: false,
        tags: ["Spicy"]
      },
      {
        restaurant: createdRestaurants[1]._id, // Pizza Hub
        name: "Farmhouse Pizza",
        description: "Delightful combination of onion, capsicum, tomato & grilled mushroom.",
        price: 399,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop",
        isVeg: true,
        tags: ["Vegetarian", "Bestseller"]
      },
      {
        restaurant: createdRestaurants[2]._id, // Burger Point
        name: "Crispy Veg Burger",
        description: "Our best-selling burger with crispy veg patty, fresh onion and our signature sauce.",
        price: 120,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
        isVeg: true,
        tags: ["Bestseller"]
      },
      {
        restaurant: createdRestaurants[3]._id, // Dragon Wok
        name: "Chilli Chicken",
        description: "Sweet, spicy & slightly sour crispy appetizer made with chicken, bell peppers, garlic.",
        price: 240,
        category: "Starters",
        image: "https://plus.unsplash.com/premium_photo-1661600371569-42b719460515?w=800&auto=format&fit=crop",
        isVeg: false,
        tags: ["Spicy"]
      }
    ];

    await MenuItem.insertMany(menuItems);
    console.log('Database Seeded Successfully with Indian Restaurants & Menus!');
    process.exit(0);
})
.catch((err) => {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1);
});

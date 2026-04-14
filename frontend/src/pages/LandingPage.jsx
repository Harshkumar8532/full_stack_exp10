import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import SkeletonLoader from '../components/SkeletonLoader';

const categories = [
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&h=150&fit=crop' },
  { name: 'Burgers', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=150&h=150&fit=crop' },
  { name: 'Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=150&h=150&fit=crop' },
  { name: 'Chinese', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=150&h=150&fit=crop' },
  { name: 'Desserts', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=150&h=150&fit=crop' },
  { name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop' }
];

export default function LandingPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants')
      .then(res => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop" alt="Food background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            Discover the best food & drinks
          </motion.h1>
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-white rounded-2xl p-2 flex items-center shadow-2xl mx-auto w-full max-w-2xl"
          >
             <div className="px-4 py-2 text-gray-500 border-r border-gray-200 hidden sm:block">
               <span className="truncate">New York, NY</span>
             </div>
             <input type="text" placeholder="Search for restaurant, cuisine or a dish" className="flex-1 px-4 py-2 outline-none text-gray-800" />
             <button onClick={() => navigate('/restaurants')} className="bg-primary hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-colors">
               Search
             </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Inspiration for your first order</h2>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {categories.map((cat, i) => (
             <motion.div 
               key={i}
               whileHover={{ scale: 1.05 }}
               className="flex flex-col items-center gap-3 cursor-pointer min-w-[100px]"
             >
               <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white dark:border-dark-border">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
               </div>
               <span className="font-medium text-gray-800 dark:text-gray-200">{cat.name}</span>
             </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top restaurants in your location</h2>
          <Link to="/restaurants" className="text-primary font-bold hover:underline">See all</Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1,2,3,4].map(n => <SkeletonLoader key={n} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {restaurants.slice(0, 8).map(restaurant => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="card-hover group cursor-pointer"
      >
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {restaurant.offers && (
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 pt-10">
              <span className="text-white font-extrabold text-lg tracking-tight uppercase">{restaurant.offers}</span>
            </div>
          )}
        </div>
        
        <div className="px-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate max-w-[75%]">{restaurant.name}</h3>
            <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
              <span>{restaurant.rating}</span>
              <Star size={10} className="fill-white" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span className="truncate">{restaurant.cuisines.join(', ')}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-100 dark:border-dark-border">
            <div className="flex items-center gap-1 font-medium">
              <Clock size={14} className="text-primary" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <span className="font-medium">₹{restaurant.priceForTwo} for two</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

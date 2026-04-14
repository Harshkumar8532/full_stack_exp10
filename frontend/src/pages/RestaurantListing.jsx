import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, SlidersHorizontal } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import SkeletonLoader from '../components/SkeletonLoader';

export default function RestaurantListing() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-28 hidden md:block border border-gray-200 dark:border-dark-border rounded-xl p-5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter size={20} /> Filters
            </h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 tet-sm">Sort By</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="sort" className="accent-primary" defaultChecked /> Popularity
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="sort" className="accent-primary" /> Delivery Time
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="sort" className="accent-primary" /> Rating: High to Low
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 tet-sm">Cuisines</h4>
              <div className="space-y-2">
                {['American', 'Indian', 'Italian', 'Chinese', 'Healthy'].map(c => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="checkbox" className="accent-primary rounded" /> {c}
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          <button className="md:hidden w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-dark-border rounded-xl py-3 font-bold">
            <SlidersHorizontal size={18} /> Filters & Sort
          </button>
        </aside>

        {/* Grid Listing */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Delivery Restaurants in New York</h2>
          
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1,2,3,4,5,6].map(n => <SkeletonLoader key={n} />)}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {restaurants.map(restaurant => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

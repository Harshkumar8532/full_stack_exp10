import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, Info, ShoppingCart } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import { GlobalContext } from '../context/GlobalContext';
import SkeletonLoader from '../components/SkeletonLoader';

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart } = useContext(GlobalContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/restaurants/${id}`)
      .then(res => {
        setRestaurant(res.data.restaurant);
        setMenu(res.data.menu);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (loading) {
    return (
      <div className="pt-24 max-w-4xl mx-auto px-4">
        <div className="h-48 bg-gray-200 dark:bg-dark-border rounded-2xl mb-8 animate-pulse"></div>
        <SkeletonLoader type="food" />
        <SkeletonLoader type="food" />
        <SkeletonLoader type="food" />
      </div>
    );
  }

  if (!restaurant) return <div className="pt-32 text-center text-2xl font-bold">Restaurant not found</div>;

  return (
    <div className="pt-24 pb-32 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Restaurant Header */}
      <div className="mb-10 p-6 rounded-2xl bg-white dark:bg-dark-surface shadow-sm border border-gray-100 dark:border-dark-border">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{restaurant.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{restaurant.cuisines.join(', ')}</p>
            <div className="flex items-center gap-6 text-sm font-semibold">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-white fill-green-600 bg-green-600 rounded-full p-0.5" />
                <span>{restaurant.rating} Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} className="text-gray-600 dark:text-gray-400" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Info size={16} className="text-gray-600 dark:text-gray-400" />
                <span>${restaurant.priceForTwo} for two</span>
              </div>
            </div>
          </div>
          {restaurant.offers && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-primary/20 text-primary font-bold px-3 py-2 rounded-xl text-sm text-center">
              <div>{restaurant.offers.split(' up')[0]}</div>
              <div className="text-xs opacity-80">up{restaurant.offers.split('up')[1]}</div>
            </div>
          )}
        </div>
      </div>

      {/* Menu Categories (Mocked sidebar/topbar) */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-dark-border mb-8 overflow-x-auto scrollbar-hide pb-2">
        <button className="font-bold text-primary border-b-2 border-primary pb-2 whitespace-nowrap">Recommended</button>
        <button className="font-semibold text-gray-500 dark:text-gray-400 pb-2 whitespace-nowrap hidden sm:block">Starters</button>
        <button className="font-semibold text-gray-500 dark:text-gray-400 pb-2 whitespace-nowrap hidden sm:block">Main Course</button>
        <button className="font-semibold text-gray-500 dark:text-gray-400 pb-2 whitespace-nowrap hidden sm:block">Desserts</button>
      </div>

      {/* Menu List */}
      <div>
        <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2">
          Recommended <span className="text-sm font-semibold text-gray-400">({menu.length})</span>
        </h2>
        
        <div className="flex flex-col">
          {menu.map(item => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Floating Cart Preview */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-0 left-0 w-full p-4 pointer-events-none z-50 flex justify-center">
          <div className="bg-[#60b246] pointer-events-auto text-white p-4 rounded-xl shadow-2xl flex items-center justify-between w-full max-w-2xl">
            <div className="font-bold flex items-center gap-2">
              <span>{cartItemCount} item{cartItemCount > 1 && 's'}</span>
              <span className="text-white/60">|</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Link to="/cart" className="font-bold uppercase tracking-wide flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded transition-colors">
              View Cart <ShoppingCart size={18} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

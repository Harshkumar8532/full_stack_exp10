import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Search } from 'lucide-react';

export default function Success() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  if (!orderId) return <Navigate to="/" />;

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8"
      >
        <CheckCircle size={100} className="text-[#60b246] mx-auto" />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
      >
        Order Placed Successfully!
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-gray-500 max-w-xl mx-auto mb-2"
      >
        Your order <span className="font-bold">#{orderId.slice(-6).toUpperCase()}</span> has been placed securely and is being prepared by the restaurant.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-red-50 dark:bg-primary/10 border border-primary/20 p-4 rounded-xl inline-block mt-4 mb-8"
      >
        <p className="font-semibold text-primary">Estimated Delivery: 30 - 45 Minutes</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4"
      >
        <Link to="/profile" className="bg-white dark:bg-dark-surface text-gray-800 dark:text-white border border-gray-200 dark:border-dark-border font-bold px-8 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          Track Order
        </Link>
        <Link to="/restaurants" className="bg-primary text-white font-bold px-8 py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors">
          Browse More
        </Link>
      </motion.div>
    </div>
  );
}

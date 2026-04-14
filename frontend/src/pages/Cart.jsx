import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { Percent } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity } = useContext(GlobalContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxAndCharges = subtotal * 0.1;
  const deliveryFee = subtotal > 0 ? 3.0 : 0;
  const total = subtotal + taxAndCharges + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">You can go to home page to view more restaurants</p>
        <button onClick={() => navigate('/restaurants')} className="bg-primary text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow uppercase tracking-wide">
          See Restaurants near you
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List */}
        <div className="flex-1">
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-border pb-4">Order Details</h2>
            
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      {item.isVeg ? (
                        <span className="w-3 h-3 flex items-center justify-center border border-green-600 rounded-sm mb-1"><span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span></span>
                      ) : (
                        <span className="w-3 h-3 flex items-center justify-center border border-red-600 rounded-sm mb-1"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span></span>
                      )}
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{item.name}</h4>
                      <p className="font-semibold text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex items-center border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface shadow-sm overflow-hidden h-9">
                      <button onClick={() => updateQuantity(item._id, -1)} className="px-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-background font-bold h-full">-</button>
                      <span className="px-2 text-primary font-bold text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, 1)} className="px-3 text-primary hover:bg-gray-100 dark:hover:bg-dark-background font-bold h-full">+</button>
                    </div>
                    <span className="font-bold w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-border relative">
              <input type="text" placeholder="Any suggestions? We will pass it on..." className="w-full py-3 px-4 bg-gray-50 dark:bg-dark-background border border-gray-200 dark:border-dark-border rounded-xl text-sm outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Price Breakdown Sidebar */}
        <div className="w-full lg:w-96 shrink-0">
          
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border mb-6">
            <div className="flex items-center gap-3 border border-dashed border-primary/50 bg-red-50 dark:bg-primary/5 rounded-xl p-4 cursor-pointer hover:bg-red-100 dark:hover:bg-primary/10 transition-colors">
              <Percent size={20} className="text-primary" />
              <span className="font-bold text-gray-800 dark:text-gray-200 flex-1">Apply Coupon</span>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-border pb-4">Bill Details</h3>
            
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-dark-border">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes and Charges</span>
                <span>${taxAndCharges.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white mb-6">
              <span>To Pay</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button onClick={() => navigate('/checkout')} className="w-full bg-primary hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg transition-colors uppercase tracking-wide">
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

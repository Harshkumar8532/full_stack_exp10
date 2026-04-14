import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { Navigate } from 'react-router-dom';
import { User, MapPin, Package, Settings, LogOut } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useContext(GlobalContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    // Currently fetches all orders because we don't have auth filtered orders
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data.reverse()))
      .catch(err => console.error(err));
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar sidebar */}
      <aside className="w-full md:w-72 shrink-0">
        <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border sticky top-28">
           <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-dark-border">
             <div className="w-16 h-16 bg-gray-200 dark:bg-dark-border rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
               {user.name.charAt(0)}
             </div>
             <div>
               <h3 className="font-bold text-lg text-gray-900 dark:text-white">{user.name}</h3>
               <p className="text-gray-500 text-sm hidden sm:block md:hidden lg:block truncate max-w-[150px]">{user.email || 'user@example.com'}</p>
             </div>
           </div>

           <nav className="space-y-2">
             <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${activeTab === 'orders' ? 'bg-red-50 dark:bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-background'}`}>
               <Package size={20} /> Orders
             </button>
             <button onClick={() => setActiveTab('addresses')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${activeTab === 'addresses' ? 'bg-red-50 dark:bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-background'}`}>
               <MapPin size={20} /> Addresses
             </button>
             <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${activeTab === 'settings' ? 'bg-red-50 dark:bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-background'}`}>
               <Settings size={20} /> Settings
             </button>
             <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-background transition-colors mt-8">
               <LogOut size={20} /> Logout
             </button>
           </nav>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1">
        <div className="bg-white dark:bg-dark-surface rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-dark-border min-h-[60vh]">
          
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Past Orders</h2>
              {orders.length === 0 ? (
                <p className="text-gray-500">No past orders found.</p>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-gray-200 dark:border-dark-border rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4 border-b border-gray-100 dark:border-dark-border pb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">ORDER #{order._id.slice(-8).toUpperCase()}</p>
                          <p className="font-bold text-gray-900 dark:text-white">${order.totalAmount.toFixed(2)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-gray-100 dark:bg-dark-background p-3 rounded-lg text-gray-500">
                          <Package size={24} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{order.items.length} Items</p>
                          <p className="text-sm text-gray-500">{order.items.map(i => i.menuItem?.name || 'Item').join(', ')}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 dark:border-dark-border text-sm text-gray-600 dark:text-gray-400">
                        Delivered to: <span className="font-medium text-gray-900 dark:text-gray-300">{order.customerAddress}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Manage Addresses</h2>
              <div className="border-2 border-dashed border-gray-200 dark:border-dark-border rounded-xl p-8 text-center text-gray-500 cursor-pointer hover:border-primary hover:text-primary transition-colors font-medium">
                + Add New Address
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Account Settings</h2>
              <p className="text-gray-500">Settings coming soon.</p>
            </div>
          )}
          
        </div>
      </main>

    </div>
  );
}

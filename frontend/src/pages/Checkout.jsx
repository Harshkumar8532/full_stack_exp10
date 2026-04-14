import React, { useState, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Banknote, Landmark } from 'lucide-react';

export default function Checkout() {
  const { cart, user, clearCart } = useContext(GlobalContext);
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal * 0.1) + (subtotal > 0 ? 3.0 : 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0 || !address) return;
    
    setLoading(true);
    try {
      const payload = {
        customerName: user?.name || 'Guest',
        customerAddress: address,
        phone: user?.phone || '0000000000',
        items: cart.map(i => ({ menuItem: i._id, quantity: i.quantity })),
        totalAmount: total
      };

      const res = await axios.post('http://localhost:5000/api/orders', payload);
      clearCart();
      navigate('/success', { state: { orderId: res.data._id } });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white">Secure Checkout</h1>
      
      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          
          {/* Address Box */}
          <div className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><MapPin size={22} className="text-primary"/> Delivery Address</h2>
            <textarea 
               required
               value={address}
               onChange={e => setAddress(e.target.value)}
               placeholder="Enter your complete delivery address (House No, Street, Landmark)..."
               className="w-full bg-gray-50 dark:bg-dark-background border border-gray-200 dark:border-dark-border rounded-xl p-4 outline-none focus:border-primary min-h-[120px] resize-none"
            ></textarea>
          </div>

          {/* Payment Box */}
          <div className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CreditCard size={22} className="text-primary"/> Payment Method</h2>
            
            <div className="space-y-3">
              <label className={`flex items-center gap-4 p-4 rounded-xl border ${paymentMethod === 'card' ? 'border-primary bg-red-50 dark:bg-primary/10' : 'border-gray-200 dark:border-dark-border'} cursor-pointer transition-colors`}>
                <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-primary w-5 h-5" />
                <CreditCard className={paymentMethod === 'card' ? 'text-primary' : 'text-gray-500'} />
                <span className="font-semibold text-gray-800 dark:text-gray-200">Credit / Debit Card</span>
              </label>
              
              <label className={`flex items-center gap-4 p-4 rounded-xl border ${paymentMethod === 'upi' ? 'border-primary bg-red-50 dark:bg-primary/10' : 'border-gray-200 dark:border-dark-border'} cursor-pointer transition-colors`}>
                <input type="radio" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="accent-primary w-5 h-5" />
                <Landmark className={paymentMethod === 'upi' ? 'text-primary' : 'text-gray-500'} />
                <span className="font-semibold text-gray-800 dark:text-gray-200">UPI / Netbanking</span>
              </label>
              
              <label className={`flex items-center gap-4 p-4 rounded-xl border ${paymentMethod === 'cod' ? 'border-primary bg-red-50 dark:bg-primary/10' : 'border-gray-200 dark:border-dark-border'} cursor-pointer transition-colors`}>
                <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-primary w-5 h-5" />
                <Banknote className={paymentMethod === 'cod' ? 'text-primary' : 'text-gray-500'} />
                <span className="font-semibold text-gray-800 dark:text-gray-200">Cash on Delivery</span>
              </label>
            </div>
          </div>
          
        </div>

        {/* Amount Summary Box */}
        <div className="w-full lg:w-96">
           <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border sticky top-28">
             <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-border pb-4">Payable Amount</h3>
             <div className="flex justify-between font-extrabold text-3xl text-gray-900 dark:text-white mb-8">
               <span>Total</span>
               <span>${total.toFixed(2)}</span>
             </div>
             <button disabled={loading} type="submit" className="w-full bg-[#60b246] hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-colors uppercase tracking-wide disabled:opacity-50">
               {loading ? 'Processing...' : `Pay $${total.toFixed(2)} & Order`}
             </button>
             <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed">
               By placing this order you agree to our Terms of Use and Privacy Policy.
             </p>
           </div>
        </div>
      </form>
    </div>
  );
}

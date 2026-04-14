import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-dark-surface mt-20 pt-16 pb-8 border-t border-gray-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tighter">Zomiggy</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Best in class food delivery service available in 500+ cities across the globe.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary">Help & Support</a></li>
              <li><a href="#" className="hover:text-primary">Partner with us</a></li>
              <li><a href="#" className="hover:text-primary">Ride with us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary">Refund Policy</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2026 Zomiggy Technologies Pvt. Ltd</p>
        </div>
      </div>
    </footer>
  );
}

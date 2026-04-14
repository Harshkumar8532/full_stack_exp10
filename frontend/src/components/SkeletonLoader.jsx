import React from 'react';

export default function SkeletonLoader({ type = 'restaurant' }) {
  if (type === 'restaurant') {
    return (
      <div className="w-full animate-pulse">
        <div className="w-full aspect-[4/3] bg-gray-200 dark:bg-dark-border rounded-2xl mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-1/2 mb-4"></div>
        <div className="flex justify-between border-t border-gray-100 dark:border-dark-border pt-2 mt-2">
          <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (type === 'food') {
    return (
      <div className="flex justify-between items-center py-6 border-b border-gray-100 dark:border-dark-border animate-pulse">
        <div className="flex-1 w-full mr-4">
          <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-1/4 mb-2"></div>
          <div className="h-5 bg-gray-200 dark:bg-dark-border rounded w-1/2 mb-4"></div>
          <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-3/4"></div>
        </div>
        <div className="w-[120px] h-[120px] bg-gray-200 dark:bg-dark-border rounded-xl"></div>
      </div>
    );
  }
}

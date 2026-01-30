import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 space-y-6">
       {/* Simulate 3 cards */}
       {[1, 2, 3].map((i) => (
         <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-pulse">
            <div className="flex justify-between items-center mb-4">
              <div className="h-5 w-24 bg-slate-200 rounded-md"></div>
              <div className="h-5 w-5 bg-slate-200 rounded-full"></div>
            </div>
            <div className="h-7 w-3/4 bg-slate-200 rounded-md mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-slate-200 rounded-md"></div>
              <div className="h-4 w-5/6 bg-slate-200 rounded-md"></div>
            </div>
            <div className="border-t border-slate-50 pt-4 flex gap-3">
               <div className="w-5 h-5 rounded-full bg-slate-200"></div>
               <div className="h-4 w-1/3 bg-slate-200 rounded-md"></div>
            </div>
         </div>
       ))}
    </div>
  );
};

export default SkeletonLoader;
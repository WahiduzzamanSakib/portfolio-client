import React from 'react';
import { FiGlobe } from 'react-icons/fi';

const OwnWebsite = () => {
    return (
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
   
               <div className="flex items-center gap-3">
                 <FiGlobe className="text-3xl text-blue-600" />
   
                 <div>
                   <h2 className="text-2xl font-bold">Website</h2>
                   <p className="text-gray-500 text-sm">
                     Manage your portfolio website.
                   </p>
                 </div>
               </div>
   
               <div className="mt-6 p-5 bg-gray-50 rounded-xl">
   
                 <h3 className="font-semibold">
                   Website Status
                 </h3>
   
                 <p className="text-green-600 mt-2">
                   ● Online
                 </p>
   
                 <a
                   href="/"
                   target="_blank"
                   className="inline-block mt-4 text-blue-600 font-medium"
                 >
                   Open Portfolio Website ↗
                 </a>
   
               </div>
   
             </div>
           );
};

export default OwnWebsite;
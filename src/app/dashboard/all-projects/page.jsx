import React from 'react';

const AllprojectPage = () => {
   return (
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
   
               <h2 className="text-2xl font-bold">
                 All Projects
               </h2>
   
               <p className="text-gray-500 text-sm mt-2">
                 Manage all your portfolio projects.
               </p>
   
               <div className="mt-6 space-y-3">
   
                 {["Portfolio Website", "E-commerce Website", "Dashboard UI"].map((project, i) => (
   
                   <div
                     key={i}
                     className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border rounded-xl p-4"
                   >
   
                     <div>
                       <h3 className="font-semibold">{project}</h3>
                       <p className="text-xs text-gray-400 mt-1">
                         Web Development
                       </p>
                     </div>
   
                     <span className="text-green-600 text-sm">
                       Published
                     </span>
   
                   </div>
   
                 ))}
   
               </div>
   
             </div>
           );
};

export default AllprojectPage;
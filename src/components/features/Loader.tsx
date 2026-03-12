import React from 'react';

interface LoaderProps {
  progress: number;
}

export function Loader({ progress }: LoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0D1117] transition-colors duration-300">
      
      {/* Creative Tech Animation */}
      <div className="relative flex items-center justify-center mb-12">
        {/* Outer glowing rings */}
        <div className="absolute w-24 h-24 border border-blue-500/30 dark:border-blue-400/20 rounded-lg animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute w-16 h-16 border border-purple-500/40 dark:border-purple-400/30 rounded-lg animate-[spin_3s_linear_infinite_reverse]"></div>
        
        {/* Center Node */}
        <div className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute w-3 h-3 bg-purple-600 dark:bg-purple-500 rounded-full"></div>
      </div>

      {/* Brand Name */}
      <h3 className="text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 drop-shadow-sm mb-6">
        <span className="font-extrabold">Basel</span> <span className="font-light">Mohamed</span>
      </h3>

      {/* Real Progress Bar */}
      <div className="w-64 flex flex-col items-center">
        <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Progress Text */}
        <div className="mt-3 flex justify-between w-full text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          <span>Initializing</span>
          <span>{progress}%</span>
        </div>
      </div>

    </div>
  );
}
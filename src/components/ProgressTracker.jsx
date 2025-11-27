import React from 'react';

const ProgressTracker = ({ progress = 0, showLabel = false }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      <div className="w-full h-2 bg-slate-200 rounded overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded transition-all duration-300"
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      {showLabel && (
        <span className="block mt-1 text-sm text-slate-500 font-medium">{clampedProgress}%</span>
      )}
    </div>
  );
};

export default ProgressTracker;


// src/components/GaugeChart.jsx
export default function GaugeChart({ value = 78, size = 200 }) {
  // size = SVG width/height (px)
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2; 
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border mt-6">
      <h3 className="font-semibold text-gray-800 mb-4">Performance</h3>

      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="block"
          >
            {/* Background ring */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#E6E9EE"
              strokeWidth={strokeWidth}
              fill="none"
            />

            {/* Progress ring */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#6366F1"         
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`} 
              style={{ transition: "stroke-dashoffset 800ms ease" }}
            />
          </svg>

          {/* Center value */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ pointerEvents: "none" }}
          >
            <span className="text-3xl font-semibold text-gray-800">{value}%</span>
            <p className="text-sm text-gray-500 mt-1">Overall Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}

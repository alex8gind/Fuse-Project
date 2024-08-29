import React from 'react';


const Logo = ({ width = 170, height = 100 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blueBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>
      <g>
        {/* Blue blurred text */}
        <text
          x="50%"
          y="50%"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="72"
          fontWeight="200"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#0066FF"
          filter="url(#blueBlur)"
        >
          FUSE
        </text>
        
        {/* Sharp violet outline */}
        <text
          x="50%"
          y="50%"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="72"
          fontWeight="200"
          textAnchor="middle"
          dominantBaseline="central"
          fill="none"
          stroke="#9933FF"
          strokeWidth="1"
        >
          FUSE
        </text>
        
        {/* Sharp violet accent */}
        <text
          x="50%"
          y="50%"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="72"
          fontWeight="200"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#9933FF"
          opacity="0.6"
          transform="translate(1, 1)"
        >
          FUSE
        </text>
      </g>
    </svg>
  );
};

export default Logo;
import React from 'react';

interface iPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

const iPhoneFrame: React.FC<iPhoneFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`iphone-frame-container ${className}`}>
      <div className="iphone-frame">
        <div className="iphone-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default iPhoneFrame; 
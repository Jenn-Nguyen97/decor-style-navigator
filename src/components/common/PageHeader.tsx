
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  backgroundImage 
}) => {
  return (
    <div
      className={`relative py-16 md:py-24 ${
        backgroundImage ? 'bg-cover bg-center' : 'bg-warm-cream'
      }`}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : {}
      }
    >
      {/* Overlay for background images */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-dark-wood/30"></div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <h1 className={`text-4xl md:text-5xl font-serif font-bold mb-4 max-w-3xl mx-auto text-center ${
          backgroundImage ? 'text-white' : 'text-dark-wood'
        }`}>
          {title}
        </h1>
        
        {description && (
          <p className={`text-lg md:text-xl max-w-3xl mx-auto text-center ${
            backgroundImage ? 'text-white/90' : 'text-warm-gray'
          }`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

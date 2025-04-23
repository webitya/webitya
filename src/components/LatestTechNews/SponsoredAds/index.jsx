import React from 'react';

const adStyles = {
  banner: 'w-full bg-yellow-100 text-center py-4 px-6 rounded-lg text-sm sm:text-base font-medium',
  medium: 'w-full bg-indigo-100 text-center py-4 px-6 rounded-md text-sm sm:text-base font-medium',
  large: 'w-full bg-green-100 text-center py-6 px-8 rounded-xl text-base sm:text-lg font-semibold',
};

const SponsoredAds = ({ size = 'banner', content, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className={adStyles[size] || adStyles.banner}>
        {content}
      </div>
    </a>
  );
};

export default SponsoredAds;

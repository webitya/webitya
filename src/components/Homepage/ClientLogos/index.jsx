import React from 'react';

const HomeClientLogos = () => {
  const logos = [
    { src: '/clients/salesSyllabus.svg', link: 'https://salessyllabus.com' },
    { src: '/clients/salesSyllabus.svg', link: 'https://salessyllabus.com' },
    { src: '/clients/salesSyllabus.svg', link: 'https://salessyllabus.com' },
    { src: '/clients/salesSyllabus.svg', link: 'https://salessyllabus.com' },
    { src: '/clients/salesSyllabus.svg', link: 'https://salessyllabus.com' },
    { src: '/clients/salesSyllabus.svg', link: 'https://salessyllabus.com' },
    { src: '/clients/salesSyllabus.svg', link: 'https://salessyllabus.com' },
    { src: '/clients/salesSyllabus.svg', link: 'https://salessyllabus.com' },
    { src: '/clients/salesSyllabus.svg', link: 'https://salessyllabus.com' },
    // Add more logos here...
  ];

  // Duplicate logos for seamless loop
  const loopedLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden py-12 bg-white">
      <h1 className="text-center text-2xl font-semibold pb-10 text-gray-800">Our Global Clients</h1>

      <div className="relative w-full">
        <div className="flex animate-marquee whitespace-nowrap">
          {loopedLogos.map((logo, index) => (
            <a key={index} href={logo.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
              <img
                src={logo.src}
                alt={`Client Logo ${index + 1}`}
                className="h-16 mx-6 grayscale hover:grayscale-0 transition duration-300"
              />
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeClientLogos;

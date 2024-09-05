import React from 'react';
import fig1 from '../assets/icons/Group 1000002515.svg';
import fig2 from '../assets/icons/Group 1000002516.svg';
import fig3 from '../assets/icons/Group 1000002518.svg';

const featuresData = [
  { img: fig1, alt: 'AI model submissions', title: '100K+', subtitle: 'AI model submissions' },
  { img: fig2, alt: 'Data Scientists', title: '50K+', subtitle: 'Data Scientists' },
  { img: fig3, alt: 'AI Challenges hosted', title: '100+', subtitle: 'AI Challenges hosted' },
];

const Features = () => {
  return (
    <div className='w-full h-auto lg:h-1/3 flex justify-center items-center bg-[#002a3b] py-8'>
      <div className='w-4/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-x-8 '>
        {featuresData.map((feature, index) => (
          <React.Fragment key={index}>
            <div className='flex justify-start items-center'>
              <img src={feature.img} alt={feature.alt} className='w-14 h-14 rounded-sm' />
              <div className='flex flex-col text-white justify-start items-start ml-6'>
                <h1 className='text-xl md:text-2xl font-semibold'>{feature.title}</h1>
                <h2 className='text-md md:text-lg'>{feature.subtitle}</h2>
              </div>
            </div>
            {index < featuresData.length - 1 && <div className=' lg:inline-block h-12 w-[1px] bg-white hidden sm:block'></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Features;

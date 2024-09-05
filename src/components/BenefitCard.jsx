import React from 'react';

const BenefitCard = ({ benefit }) => {
  return (
    <div className='w-full sm:w-[45%] bg-[#f8f9fd] flex justify-center items-center px-8 py-10 rounded-lg transition-shadow duration-300 ease-in-out'>
      <div className='flex flex-col justify-between items-start w-full'>
        <img src={benefit.img} alt={benefit.title} className='w-12 h-12 mb-4' />
        <h3 className='text-xl font-semibold text-gray-800'>{benefit.title}</h3>
        <p className='text-gray-600 mt-2'>{benefit.description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;

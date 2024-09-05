import React from 'react';
import BenefitCard from './BenefitCard';
import fig1 from '../assets/icons/carbon_notebook-reference.svg';
import fig2 from '../assets/icons/Vector.svg';
import fig3 from '../assets/icons/Robot.svg';
import fig4 from '../assets/icons/IdentificationCard.svg';

const Benefits = () => {
  const benefits = [
    {
      img: fig1,
      title: 'Prove your Skills',
      description: 'Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.',
    },
    {
      img: fig2,
      title: 'Learn from Community',
      description: 'One can look and analyze the solutions submitted by other Data Scientists in the community and learn from them.',
    },
    {
      img: fig3,
      title: 'Challenge Yourself',
      description: 'There is nothing for you to lose by participating in a challenge. You can fail safely, learn from the entire experience, and bounce back harder.',
    },
    {
      img: fig4,
      title: 'Earn Recognition',
      description: 'You will stand out from the crowd if you do well in AI challenges, which helps you shine in the community and earn rewards.',
    },
  ];

  return (
    <div className='w-full min-h-screen flex flex-col justify-around items-center py-10'>
      <h2 className='text-4xl font-semibold text-gray-800 text-center'>
        Why Participate in <span className='text-[#44924c]'>AI Challenges?</span>
      </h2>
      <div className='w-11/12 flex flex-wrap mt-10 justify-center items-start gap-8'>
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} />
        ))}
      </div>
    </div>
  );
};

export default Benefits;

import React from 'react';
import Rocket from '../assets/icons/PicsArt_04-14-04.42 1.svg';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className='w-full h-[90%] p-10 flex justify-center items-center bg-[#003145]'>
      <div className='w-4/5 flex flex-col md:flex-row justify-between items-center'>
        {/* Text Section */}
        <div className='w-full md:w-8/12 text-white flex flex-col justify-center'>
          <div className='text-3xl md:text-5xl font-semibold border-l-[10px] border-[#ffce5c] py-2 pl-6 md:pl-8'>
            Accelerate Innovation with Global AI Challenges
          </div>
          <div className='font-light text-base md:text-lg ml-6 md:ml-10 mt-6 md:mt-8'>
            AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to the test on diverse datasets, allowing you to foster learning through competitions.
          </div>
          <Link to={'/challenges/0'}>
            <button className='px-6 py-3 rounded-lg text-sm md:text-lg font-semibold bg-white text-[#003145] mt-6 md:mt-8 ml-6 md:ml-10'>
              Create Challenge
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className='w-full md:w-3/12 mt-10 md:mt-0 flex justify-center'>
          <img src={Rocket} alt='rocket' className='w-3/4 md:w-full h-auto' />
        </div>
      </div>
    </div>
  );
};

export default Banner;

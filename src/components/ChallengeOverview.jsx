import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import difficulty from '../assets/icons/carbon_skill-level-basic.svg';
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';

dayjs.extend(duration);

const ChallengeOverview = () => {
  const { id } = useParams(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const challenges = JSON.parse(localStorage.getItem('challenges')) || [];
    const challengeToOverview = challenges.find((ch) => ch.id === Number(id));
    if (challengeToOverview) {
      setChallenge({
        title: challengeToOverview.title,
        startDate: dayjs(challengeToOverview.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(challengeToOverview.endDate).format('YYYY-MM-DD'),
        description: challengeToOverview.description,
        img: challengeToOverview.img,
        level: challengeToOverview.level
      });
    }
  }, [id]);

  if (!challenge) {
    return <div>Loading...</div>;
  }

  const { title, description, startDate, endDate, level } = challenge;

  // Helper function to format time as DD:HH:MM
  const formatDuration = (duration) => {
    const days = duration.days().toString().padStart(2, '0');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    return `${days}:${hours}:${minutes}`;
  };
    
  // Format timing
  const now = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  let timing = '';

  if (now.isBefore(start)) {
    const timeUntilStart = dayjs.duration(start.diff(now));
    timing = `Starts in ${formatDuration(timeUntilStart)} (India Standard Time)`;
  } else if (now.isAfter(end)) {
    timing = `Ended on ${end.format("D MMM'YY h:mm A")} (India Standard Time)`;
  } else {
    const timeUntilEnd = dayjs.duration(end.diff(now));
    timing = `Ends in ${formatDuration(timeUntilEnd)} (India Standard Time)`;
  }

  const descriptionLines = description.split('\n');

  const handleDeleteChallenge = (id) => {
    const challenges = JSON.parse(localStorage.getItem('challenges')) || [];
    const updatedChallenges = challenges.filter((ch) => ch.id !== Number(id));
    localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    setIsModalOpen(false);
    // You may want to redirect or update the UI after deletion
    console.log(`Challenge with id ${id} has been deleted.`);
    navigate('/');
  };

  const openModal = (id) => {
    setIsModalOpen(true);
  };

  return (
    <div className='w-full min-h-screen'>  
      <div className='w-full py-16 bg-[#003145] text-white flex justify-center items-center'>
        <div className='w-3/4 my-4 flex flex-col justify-start items-start'>
          <div className='w-fit mb-4 bg-[#ffce5c] rounded-md py-1 px-8 text-black'>
            <div className='text-md font-semibold mr-10'>
              <FaRegClock className='inline-block mr-2'/>{timing}
            </div>
          </div>
          <div className='mb-8'>
            <h1 className='text-4xl font-semibold mb-2'>{title}</h1>
          </div>
          <div className='mb-8'>
            <h3 className='text-lg'>Identify the class to which each butterfly belongs to</h3>     
          </div>      
          <div className='w-fit mb-6 bg-white rounded-md px-4 py-2'>
            <img src={difficulty} alt='difficulty' className=' h-5 mr-2 inline-block' />     
            <span className='text-md font-medium text-[#003145]'>{level}</span>
          </div>    
        </div>    
      </div>

      <div className='w-full h-[10%] shadow-xl flex justify-center items-center'>
        <div className='w-3/4 ml-40'>
          <div className='w-fit h-full py-4 text-lg font-bold border-b-4 border-[#44924c]'>Overview</div>
        </div>
        <div className='w-1/4'>
          <div className='flex justify-end space-x-4 mr-8'>
            <button onClick={()=>navigate(`/challenges/${id}`)} className='bg-[#44924c] text-white px-8 py-2 rounded-lg'>Edit</button>
            <button onClick={openModal} className='bg-white text-red-600 border-2 border-red-600 px-4 py-2 rounded-lg'>Delete</button>
            <DeleteModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onDelete={handleDeleteChallenge}
              challengeId={id}
            />
          </div>
        </div>
      </div>

      <div className='w-full'>
        <div className='w-[70%] ml-40'>
          <div className='mt-4'>
            {descriptionLines.map((line, index) => (
              <p key={index} className='text-lg text-slate-600 font-normal mb-4'>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>    
  );
};

export default ChallengeOverview;

import React, { useState, useEffect } from 'react';
import ChallengesCard from './ChallengesCard';
import { IoIosSearch } from 'react-icons/io';
import { LiaAngleUpSolid, LiaAngleDownSolid } from 'react-icons/lia';
import dayjs from 'dayjs';
import { FaTimesCircle } from "react-icons/fa";

const ExploreChallenges = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let challenges = JSON.parse(localStorage.getItem('challenges')) || [
      {
        id:1,
        img:"Group 1000002771.png",
        title: 'Data Science Bootcamp - Graded Datathon',
        description: 'Description 1',
        level: 'Easy',
        startDate: dayjs().add(15, 'hours').add(23,'minutes').format(),
        endDate: dayjs().add(5, 'day').format(),
      },
      {
        id:2,
        img:"Group 1000002766.png",
        title: 'Data Sprint 72 - Butterfly Identification',
        description: 'Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word "Lepidoptera" means "scaly wings" in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows. \n\n An agency of the Governmental Wildlife Conservation is planning to implement an automated system based on computer vision so that it can identify butterflies based on captured images. As a consultant for this project, you are responsible for developing an efficient model. \n\nYour Task is to build an Image Classification Model using CNN that classifies to which class of weather  each image belongs to.',
        level: 'Easy',
        startDate: dayjs().add(12, 'hours').add(35,'minutes').format(),
        endDate: dayjs().add(12, 'day').format(),      
      },
      {
        id:3,
        img:"Group 1000002767.png",
        title: 'Data Sprint 71 - Weather Recognition',
        description: 'Description 3',
        level: 'Hard',
        startDate: dayjs().subtract(10, 'day').format(),
        endDate: dayjs().add(1,'days').add(17, 'hours').add(11,'minutes').format(), 
      },
      {
        id:4,
        img:"Group 1000002772.png",
        title: 'Data Sprint 70 - Airline Passengers Satisfaction',
        description: 'Description 4',
        level: 'Easy',
        startDate: dayjs().subtract(10, 'day').format(),
        endDate: dayjs().add(11, 'hours').add(28,'minutes').format(),      
      },
      {
        id:5,
        img:"Group 1000002773.png",
        title: 'Engineering Graduates Employment Outcomes',
        description: 'Description 5',
        level: 'Medium',
        startDate: dayjs('2022-05-11T21:00:00').format(),
        endDate: dayjs('2022-05-16T21:00:00').format(),
      },
      {
        id:6,
        img:"Group 1000002466.png",
        title: 'Travel Insurance Claim Prediction',
        description: 'Description 6',
        level: 'Hard',
        startDate: dayjs('2022-05-01T21:00:00').format(),
        endDate: dayjs('2022-05-16T21:00:00').format(),
      },
    ];
  localStorage.setItem('challenges', JSON.stringify(challenges));

  useEffect(() => {
    handleFilter();
  }, [selectedStatus, selectedLevels, searchTerm]);

  const handleFilter = () => {
    const filtered = challenges.filter(challenge => {
      const status = getStatus(challenge);
      const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes('All') || selectedStatus.includes(status);
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(challenge.level);
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesLevel && matchesSearch;
    });
    setFilteredChallenges(filtered);
  };

  const getStatus = (challenge) => {
    const now = dayjs();
    if (now.isBefore(challenge.startDate)) return 'Upcoming';
    if (now.isAfter(challenge.endDate)) return 'Past';
    return 'Active';
  };

  const handleCheckboxChange = (setFilter, filter, value) => {
    setFilter((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  };

  const removeTag = (tag, type) => {
    if (type === 'status') {
      setSelectedStatus((prev) => prev.filter((item) => item !== tag));
    } else if (type === 'level') {
      setSelectedLevels((prev) => prev.filter((item) => item !== tag));
    }
  };

  return (
    <div className='w-full min-h-screen bg-[#003145] text-white'>
      <div className='w-full h-1/2 flex flex-col justify-center items-center py-20 bg-[#002a3b]'>
        <h1 className='text-3xl font-semibold mb-12'>Explore Challenges</h1>
        <div className='relative flex flex-col sm:flex-row justify-center items-center w-4/5'>
          <div className='flex items-center w-full sm:w-3/4 bg-white rounded-xl p-3 mb-2 sm:mb-0'>
            <IoIosSearch className='text-2xl text-gray-500 ml-6' />
            <input
              type='text'
              placeholder='Search'
              className='w-full ml-4 text-lg text-gray-700 placeholder-gray-400 focus:outline-none'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='relative ml-8'>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className='w-full sm:w-auto px-4 py-3 bg-white text-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105'
            >
              Filter {isFilterOpen ? <LiaAngleUpSolid className='ml-2' /> : <LiaAngleDownSolid className='ml-2' />}
            </button>
            {isFilterOpen && (
              <>
                <div onClick={() => setIsFilterOpen(false)} className='fixed inset-0 bg-black opacity-50 z-10'></div>
                <div className='absolute -top-2 mt-2 pr-28 bg-white rounded-lg shadow-lg p-6 text-gray-700 z-20'>
                  <button
                    className='absolute top-2 right-2'
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <LiaAngleDownSolid className='text-2xl text-gray-700' />
                  </button>
                  <h2 className='font-light text-lg mb-2'>Status</h2>
                  <div className='flex flex-col space-y-2'>
                    {['All', 'Active', 'Upcoming', 'Past'].map((status) => (
                      <label key={status} className='flex items-center text-sm font-light'>
                        <input
                          type='checkbox'
                          checked={selectedStatus.includes(status)}
                          onChange={() => handleCheckboxChange(setSelectedStatus, selectedStatus, status)}
                        />
                        <span className='ml-2'>{status}</span>
                      </label>
                    ))}
                  </div>
                  <h2 className='font-light text-lg mt-4 mb-2'>Level</h2>
                  <div className='flex flex-col space-y-2'>
                    {['Easy', 'Medium', 'Hard'].map((level) => (
                      <label key={level} className='flex items-center text-sm font-light'>
                        <input
                          type='checkbox'
                          checked={selectedLevels.includes(level)}
                          onChange={() => handleCheckboxChange(setSelectedLevels, selectedLevels, level)}
                        />
                        <span className='ml-2'>{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Selected Tags */}
        <div className='w-full flex flex-wrap mt-4 ml-96'>
          {selectedStatus.map((status) => (
            <div key={status} className='bg-white bg-opacity-50 text-white px-4 py-3 rounded-full mr-5 mb-2 flex items-center'>
              {status}
              <button className='ml-2 text-white' onClick={() => removeTag(status, 'status')}>
                <FaTimesCircle />
              </button>
            </div>
          ))}
          {selectedLevels.map((level) => (
            <div key={level} className='bg-white bg-opacity-50 text-white px-4 py-3 rounded-full mr-5 mb-2 flex items-center'>
              {level}
              <button className='ml-2 white' onClick={() => removeTag(level, 'level')}>
                <FaTimesCircle />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Challenges Cards */}
      <div className='w-full h-max bg-[#003145] flex justify-center items-start flex-wrap gap-10 py-10'>
        {filteredChallenges.map((challenge, index) => (
          <ChallengesCard key={index} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};

export default ExploreChallenges;
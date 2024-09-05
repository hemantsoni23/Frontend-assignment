import React, { useState, useEffect } from 'react';
import { SiTicktick } from "react-icons/si";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { useNavigate } from 'react-router';

dayjs.extend(relativeTime);
dayjs.extend(duration);

const ChallengesCard = ({ challenge }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const image = require(`../assets/cardimage/${challenge.img}`);
      setImgSrc(image);
    } catch (error) {
      setImgSrc(require('../assets/cardimage/default-image.png')); 
    }
  }, [challenge.img]);

  const now = dayjs();
  const startDate = dayjs(challenge.startDate);
  const endDate = dayjs(challenge.endDate);

  let status = "";
  let timing = "";

  // Helper function to format time as DD:HH:MM
  const formatDuration = (duration) => {
    const days = duration.days().toString().padStart(2, '0');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    return `${days}:${hours}:${minutes}`;
  };

  // Helper function to add suffixes to the day of the month
  const addDateSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  if (now.isBefore(startDate)) {
    status = "Upcoming";
    const timeUntilStart = dayjs.duration(startDate.diff(now));
    timing = (
      <>
        <span className="font-medium text-sm">Starts in</span>
        <br />
        <span className="font-bold text-lg">{formatDuration(timeUntilStart)}</span>
        <br />
        <span className="font-normal text-xs">Days Hours Mins</span>
      </>
    );
  } else if (now.isAfter(endDate)) {
    status = "Past";
    timing = (
      <>
        <span className="font-medium">Ended on</span>
        <br />
        <span className="font-bold text-xl">
          {addDateSuffix(endDate.date())} {endDate.format("MMM'YY h:mm A")}
        </span>
      </>
    );
  } else {
    status = "Active";
    const timeUntilEnd = dayjs.duration(endDate.diff(now));
    timing = (
      <>
        <span className="font-medium text-sm">Ends in</span>
        <br />
        <span className="font-bold text-lg">{formatDuration(timeUntilEnd)}</span>
        <br />
        <span className="font-normal text-xs">Days Hours Mins</span>
      </>
    );
  }

  return (
    <div onClick={() => navigate(`/challengesoverview/${challenge.id}`)} className='w-11/12 md:w-1/4 h-full rounded-2xl bg-white text-black flex flex-col cursor-pointer'>
      <img
        src={imgSrc}
        alt={challenge.title}
        className='w-full h-1/3 rounded-t-xl'
      />
      <div className='w-full h-full flex flex-col justify-around items-center p-5'>
        {/* Status */}
        <div className={`w-1/4 font-light text-xs text-center py-1 rounded-md mb-4 ${status === "Active" ? "bg-[#d2e5d4] text-[#44924c]" : status === "Upcoming" ? "bg-[#fcf1d2] text-[#1f1e1a]" : "bg-[#ffded4] text-[#666666]"}`}>
          {status}
        </div>

        {/* Title */}
        <div className='w-3/4 font-bold text-md mb-4 text-center'>{challenge.title}</div>

        {/* Timing */}
        <div className={`w-3/4 text-center ${status === 'Past' ? "my-[1.28rem]" : "mb-4"} text-[#454545] whitespace-pre-line`}>
          {timing}
        </div>

        {/* Button */}
        <button className='text-[#ffffff] bg-[#44924c] rounded-lg px-4 py-2 flex items-center'>
          <SiTicktick className='mr-3' />
          <span className='font-normal text-sm'>Participate Now</span>
        </button>
      </div>
    </div>
  );
};

export default ChallengesCard;

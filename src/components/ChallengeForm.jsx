import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import calender from '../assets/icons/uil_calender.svg';
import upload from '../assets/icons/bxs_cloud-upload.svg';
import imageFill from '../assets/icons/bi_image-fill.svg';
import { FaArrowRight } from "react-icons/fa6";

const ChallengeForm = () => {
  var { id } = useParams();
  id = Number(id);
  const [challenge, setChallenge] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    img: '',
    level: 'Easy'
  });

  
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const challenges = JSON.parse(localStorage.getItem('challenges')) || [];
      const challengeToEdit = challenges.find((ch) => ch.id === id);
      if (challengeToEdit) {
        setChallenge({
          title: challengeToEdit.title,
          startDate: dayjs(challengeToEdit.startDate).format('YYYY-MM-DD'),
          endDate: dayjs(challengeToEdit.endDate).format('YYYY-MM-DD'),
          description: challengeToEdit.description,
          img: challengeToEdit.img,
          level: challengeToEdit.level
        });
        try {
          const image = require(`../assets/cardimage/${challengeToEdit.img}`);
          setChallenge({
            title: challengeToEdit.title,
            startDate: dayjs(challengeToEdit.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(challengeToEdit.endDate).format('YYYY-MM-DD'),
            description: challengeToEdit.description,
            img: image || '',
            level: challengeToEdit.level
          });
          setImageError(false);  
        } catch (error) {
          setImageError(true);  
          setChallenge((prev) => ({ ...prev, img: '' })); 
        }
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallenge((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      setChallenge((prev) => ({ ...prev, img: fileName }));

      // If we want to store the file locally then we use
      // setChallenge((prev) => ({ ...prev, img: URL.createObjectURL(fileName) }));

      setIsImageChanged(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const challenges = JSON.parse(localStorage.getItem('challenges')) || [];

    const fileName = challenge.img.split('/').pop();

    if (id) {
      const updatedChallenges = challenges.map((ch) =>
        ch.id === id ? { ...challenge, id, img: fileName } : ch
      );
      localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
      alert('Challenge Updated Successfully!');
      navigate(`/challengesoverview/${id}`)
      
    } else {
      const newId = challenges.length > 0 ? challenges[challenges.length - 1].id + 1 : 1;
      challenges.push({
        ...challenge,
        id: newId,
        img: fileName,
        startDate: dayjs(challenge.startDate).format(),
        endDate: dayjs(challenge.endDate).format(),
      });
      localStorage.setItem('challenges', JSON.stringify(challenges));
      alert('Challenge Created Successfully!');
      navigate('/')
    }

    setChallenge({
      title: '',
      startDate: '',
      endDate: '',
      description: '',
      img: '',
      level: 'Easy'
    });
  };

  return (
    <div className='w-full min-h-screen flex flex-col items-start'>
      <div className='w-full bg-[#f8f9fd] flex justify-start items-center p-9'>
        <h1 className='text-2xl font-[650] ml-14'>Challenge Details</h1>
      </div>
      <form 
        className='w-full min-w-lg max-w-4xl text-black p-8 ml-14'
        onSubmit={handleSubmit}
      >
        {/* Challenge Name */}
        <div className='mb-6'>
          <label htmlFor='title' className='block text-md font-medium mb-2'>Challenge Name</label>
          <input 
            type='text' 
            id='title' 
            name='title' 
            value={challenge.title} 
            onChange={handleChange} 
            className='w-3/4 md:w-[55%] p-2 border-[#b7b7b7] border rounded-md focus:outline-none focus:border-slate-500' 
            required 
          />
        </div>

        {/* Start Date */}
        <div className='mb-6 relative'>
          <label htmlFor='startDate' className='block text-md font-medium mb-2'>Start Date</label>
          <input
            type='text' 
            id='startDate' 
            name='startDate' 
            value={challenge.startDate} 
            onChange={handleChange} 
            className='w-3/4 md:w-[55%] p-2 border-[#b7b7b7] border rounded-md focus:outline-none focus:border-slate-500 placeholder-slate-400'
            placeholder='Add start date'
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            style={{
              backgroundImage: `url(${calender})`,
              backgroundPosition: 'right 10px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '20px 20px'
            }} 
            required 
          />
        </div>

        {/* End Date */}
        <div className='mb-6 relative'>
          <label htmlFor='endDate' className='block text-md font-medium mb-2'>End Date</label>
          <input 
            type='text' 
            id='endDate' 
            name='endDate' 
            value={challenge.endDate} 
            onChange={handleChange} 
            className='w-3/4 md:w-[55%] p-2 border-[#b7b7b7] border rounded-md focus:outline-none focus:border-slate-500 placeholder-slate-400'
            placeholder='Add end date'
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            style={{
              backgroundImage: `url(${calender})`,
              backgroundPosition: 'right 10px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '20px 20px'
            }}           
            required 
          />
        </div>

        {/* Description */}
        <div className='mb-6'>
          <label htmlFor='description' className='block text-md font-medium mb-2'>Description</label>
          <textarea 
            id='description' 
            name='description' 
            value={challenge.description} 
            onChange={handleChange} 
            className='w-3/4 md:w-full p-2 border-[#b7b7b7] border rounded-md focus:outline-none focus:border-slate-500 resize-none' 
            rows='10' 
            required 
          />
        </div>

        {/* Image */}
        <div className='mb-6'>
          <label htmlFor='img' className='block text-md font-medium mb-2'>Image</label>
          {imageError ? (
            <p className='text-red-500'>Image not found</p>
          ) : challenge.img && !isImageChanged ? (
            <>
              <div className='bg-[#f8f9fd] rounded-xl p-4 w-3/4 md:w-[35%]'>  
                <img src={challenge.img} alt='Challenge' className='w-full mb-4 rounded-xl' />
                <button
                  type='button'
                  onClick={() => setIsImageChanged(true)}
                  className='mb-4 text-sm text-green-500 underline'
                >
                  <div className='inline-block'>  
                      <img src={imageFill} alt='Fill Icon' className='w-4 h-4 mr-2 inline-block' />  
                      Change Image
                      <FaArrowRight className='inline-block ml-2' />
                  </div>
                </button>
              </div>
            </>
          ) : (
            <label 
              htmlFor='img' 
              className='w-[30%] p-2 bg-slate-200 text-center text-slate-700 border-[#b7b7b7] border rounded-md focus:outline-none focus:border-slate-500 cursor-pointer flex justify-center items-center'>
              Upload
              <img src={upload} alt="Upload Icon" className='w-5 h-5 ml-2' />
            </label>
          )}
          <input 
            type='file' 
            id='img' 
            name='img' 
            onChange={handleImageChange} 
            accept='image/*' 
            className='hidden'
          />
        </div>

        {/* Level Type */}
        <div className='mb-6'>
          <label htmlFor='level' className='block text-md font-medium mb-2'>Level Type</label>
          <select 
            id='level' 
            name='level' 
            value={challenge.level} 
            onChange={handleChange} 
            className='w-[30%] p-2 text-sm border-[#b7b7b7] border rounded-md focus:outline-none focus:border-slate-500' 
            required 
          >
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type='submit' 
          className='w-3/4 md:w-3/12 bg-[#44924c] text-white p-3 rounded-lg font-medium hover:bg-green-700 my-8'
        >
          {id>0 ? 'Save Changes' : 'Create Challenge'}
        </button>
      </form>
    </div>
  );
};

export default ChallengeForm;

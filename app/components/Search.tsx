'use client';

import React, { useState } from 'react';

const SearchBar = () => {
  const [message, setMessage] = useState('');

  const handleSearchStringChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = (str: String) => {
    console.log(str);
  };

  return (
    <div className='flex flex-col items-center justify-start min-h-screen pt-5 resize'>
      <div className='flex items-center justify-center'>
        <div className='flex border-2 rounded'>
          <input
            id='message'
            type='text'
            onChange={handleSearchStringChange}
            className='px-4 py-2'
            placeholder='Enter book keywords...'
          />
          <button
            className='flex items-center justify-center px-4 border-l'
            onClick={() => handleClick(message)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-gray-600'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

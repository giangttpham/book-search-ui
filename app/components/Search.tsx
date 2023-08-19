'use client';

import React, { useState } from 'react';
import BookList from './BookList';

export interface IImageLinks {
  smallThumbnail: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

export interface IBook {
  book_id: string;
  title: string;
  authors: string[];
  description: string;
  image_links: IImageLinks;
  // previousState: null;
}

const SearchBar = () => {
  const [message, setMessage] = useState('');

  const [data, setData] = useState<IBook[] | null>(null);

  const handleSearchStringChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = (str: String) => {
    console.log(str);
  };

  async function searchBooks(searchString: string) {
    const params = new URLSearchParams();
    params.append('keywords', searchString);

    console.log(params.toString);
    const res = await fetch(
      process.env.NEXT_PUBLIC_BOOK_SEARCH_API_URL +
        `/books/?` +
        params.toString(),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data: IBook[] | null) => {
        setData(data);
        // setLoading(false)
      });
  }
  return (
    <div className='min-h-screen'>
      <div className='flex flex-col items-center justify-start py-5 resize'>
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
              onClick={() => searchBooks(message)}
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
      <div className='container mx-auto'>
        <BookList books={data} />
      </div>
    </div>
  );
};

export default SearchBar;

'use client';

import React, { useEffect, useState } from 'react';
import BookList from './BookList';
import Pagination from './Pagination';

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
}

export interface IBookSearchResponse {
  total_items: number;
  books: IBook[];
}

const emptyBookData: IBookSearchResponse = {
  total_items: 0,
  books: [],
};

const LIMIT: number = 10;

const Search = () => {
  const [data, setData] = useState<IBookSearchResponse>(emptyBookData);
  const [hasMore, setHasMore] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [previousSearchSring, setPreviousSearchString] = useState('');
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (keywords.length > 0) searchBooks(keywords);
  }, [startIndex]);

  const handleSearchStringChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setKeywords(event.target.value);
  };

  const handlePageChange = (nextPage: boolean) => {
    // Reset the startIndex if the search string has changed
    if (previousSearchSring !== keywords) {
      // Setting startIndex to the same value doesn't trigger the effect
      if (startIndex === 0) {
        searchBooks(keywords);
      } else {
        setStartIndex(0);
      }
      return;
    }

    if (nextPage === false && startIndex >= LIMIT) {
      setStartIndex(startIndex - LIMIT);
    }

    if (nextPage === true && startIndex + LIMIT <= data.total_items) {
      setStartIndex(startIndex + LIMIT);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  async function searchBooks(searchString: string) {
    const params = new URLSearchParams();
    params.append('keywords', searchString);
    params.append('skip', startIndex.toString());
    params.append('limit', LIMIT.toString());

    setPreviousSearchString(searchString);
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
      .then((data: IBookSearchResponse | null) => {
        if (data === null) {
          setData({
            total_items: 0,
            books: [],
          });
          setHasMore(false);
        } else {
          setData(data);
          if (startIndex + LIMIT < data.total_items) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          scrollToTop();
        }
      });
  }
  return (
    <div className='min-h-screen'>
      <div className='flex flex-col items-center justify-start py-5 resize'>
        <div className='flex items-center justify-center'>
          <div className='flex border-2 rounded'>
            <input
              data-test-id='search-input'
              id='message'
              type='text'
              onChange={handleSearchStringChange}
              className='px-4 py-2'
              placeholder='Enter book keywords...'
            />
            <button
              data-test-id='search-button'
              className='flex items-center justify-center px-4 border-l'
              onClick={() => handlePageChange(false)}
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
        <BookList books={data.books} />
      </div>
      <div>
        <Pagination
          hasMore={hasMore}
          onPageChange={handlePageChange}
          startIndex={startIndex}
        />
      </div>
    </div>
  );
};

export default Search;

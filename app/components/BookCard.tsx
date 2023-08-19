import React, { FunctionComponent } from 'react';
import { IBook } from './Search';

export interface BookCardProp {
  book: IBook;
}

// function BookCard({ book }) {
const BookCard: FunctionComponent<BookCardProp> = ({ book }) => {
  const imageLink: string =
    book.image_links.thumbnail ??
    'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  return (
    <div className='block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 my-2'>
      <div className='grid grid-cols-9 gap-4'>
        <div className='col-span-2 flex justify-center py-1'>
          <a href='#!'>
            <img className='rounded-t-lg' src={imageLink} alt='' />
          </a>
        </div>
        <div className='col-span-7 p-6'>
          <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
            {book.title}
          </h5>
          <p className='mb-4 text-base text-neutral-600 dark:text-neutral-200'>
            {book.authors.toString()}
          </p>
          <p className='mb-4 text-base text-neutral-600 dark:text-neutral-200'>
            {book.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

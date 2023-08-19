import React, { FunctionComponent } from 'react';
import BookCard, { BookCardProp } from './BookCard';
import { IBook } from './Search';

export interface BookListProp {
  books: IBook[] | null;
}

const BookList: FunctionComponent<BookListProp> = ({ books }) => {
  const bookList =
    books === null
      ? []
      : books.map((book: IBook) => <BookCard key={book.book_id} book={book} />);
  return <div>{bookList}</div>;
};

export default BookList;

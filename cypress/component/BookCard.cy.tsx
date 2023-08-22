import React from 'react';
import BookCard from '../../app/components/BookCard';
import { IBook } from '../../app/components/Search';

describe('<BookCard />', () => {
  it('renders', () => {
    const book: IBook = {
      book_id: 'asdfas',
      title: 'Book title',
      authors: ['Author 1', 'Author 2'],
      description: 'Some description',
      image_links: {
        smallThumbnail: '',
        thumbnail: '',
        small: '',
        medium: '',
        large: '',
        extraLarge: '',
      },
    };
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BookCard book={book} />);
  });
});

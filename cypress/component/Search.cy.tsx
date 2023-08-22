import React from 'react';
import Search from '../../app/components/Search';

describe('<Search />', () => {
  it('renders', () => {
    cy.mount(<Search />);
  });

  it(`disables navigation buttons if the response contains less items than page limit`, () => {
    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: '/books/*', // that have a URL that matches '/users/*'
      },
      {
        statusCode: 200,
        body: {
          total_items: 1,
          books: [
            {
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
            },
          ],
        },
      }
    ).as('getBooks'); // and assign an alias
    cy.mount(<Search />);

    // Search input should be empty when page loads
    cy.get('[data-test-id="search-input"]').should('have.value', '');

    // Update input values
    cy.get('[data-test-id="search-input"]').type('frankeinstein');
    cy.get('[data-test-id="search-input"]').should(
      'have.value',
      'frankeinstein'
    );

    // Press search button
    cy.get('[data-test-id="search-button"]').click();

    cy.get('[data-test-id="prev-button"]').should('be.disabled');
    cy.get('[data-test-id="next-button"]').should('be.disabled');
  });

  it(`enables Next button if the response contains more items than page limit`, () => {
    var bookList = [];
    for (let i = 0; i < 11; i++) {
      bookList.push({
        book_id: i,
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
      });
    }

    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: '/books/*', // that have a URL that matches '/users/*'
      },
      {
        statusCode: 200,
        body: {
          total_items: 11,
          books: bookList,
        },
      }
    ).as('getBooks'); // and assign an alias
    cy.mount(<Search />);

    // Search input should be empty when page loads
    cy.get('[data-test-id="search-input"]').should('have.value', '');

    // Update input values
    cy.get('[data-test-id="search-input"]').type('frankeinstein');
    cy.get('[data-test-id="search-input"]').should(
      'have.value',
      'frankeinstein'
    );

    // Press search button
    cy.get('[data-test-id="search-button"]').click();

    cy.get('[data-test-id="prev-button"]').should('be.disabled');
    cy.get('[data-test-id="next-button"]').should('be.enabled');
  });
});

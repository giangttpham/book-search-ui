import BookList from '@/app/components/BookList';

describe('BookList.cy.tsx', () => {
  it('renders', () => {
    cy.mount(<BookList books={[]} />);
  });
});

import Image from 'next/image';
import SearchBar from './components/Search';
import BookCard from './components/BookCard';
import BookList from './components/BookList';
import RootLayout from './layout';

export default function Home() {
  return (
    <RootLayout>
      <SearchBar />
    </RootLayout>
  );
}

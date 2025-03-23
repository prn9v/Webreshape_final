import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // Optionally trigger search on typing after debounce
    // Use setTimeout for simple debounce
    // clearTimeout(timeoutRef.current);
    // timeoutRef.current = setTimeout(() => onSearch(newQuery), 500);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for articles, topics, or tags..."
          value={query}
          onChange={handleChange}
        />
        <Search className="search-icon" size={22} />
      </form>
    </div>
  );
};

export default SearchBar;

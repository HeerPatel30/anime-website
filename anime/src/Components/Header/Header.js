import React, { useState } from 'react';
import '../Header/Header.css';

const Header = () => {
  const [search, setSearch] = useState('');

  const onSearch = async (e) => {
    e.preventDefault(); // Corrected typo
    setSearch(e.target.value);
    getData()
  };

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`);
      const data = await res.json();
      console.log(data); // Log the fetched data for now
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <>
  <div className='container1'>
      <div>
        <h1>
          Anime <span>Watch</span>
        </h1>
      </div>
      <div className='search'>
        <input
          type='text'
          placeholder='Search Anime'
          value={search}
          onChange={onSearch} // Pass the function reference
          />
      </div>
    
    </div>

          </>
  );
};

export default Header;

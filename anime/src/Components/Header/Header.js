import React, { useState } from 'react';
import '../Header/Header.css';

const Header = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = async (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    getData();
  };

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`);
      const data = await res.json();
      setSearchResults(data.results);
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
            onChange={onSearch}
          />
        </div>
      </div>
      
      {searchResults.map((anime) => (
        <div className="card" key={anime.id}>
          <img src={anime.image_url} className="card-img-top" alt={anime.title} />
          <div className="card-body">
            <p className="card-text">{anime.title}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Header;

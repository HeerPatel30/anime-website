import React, { useState } from 'react';
import '../Header/Header.css';

const Header = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = async (e) => {
    e.preventDefault();
    const searchText = e.target.value;
    setSearch(searchText);
  };

  const getData = async (searchText) => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchText}`);
      const data = await res.json();
      console.log(data);
      setSearchResults(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    getData(search);
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
            onBlur={handleSearch} // Trigger search when input loses focus
          />
        </div>
      </div>
      <div className='card-body'>

      {searchResults && searchResults.length > 0 && searchResults.map((anime) => (
        // console.log(anime)
        <div className="card" key={anime.mal_id
          }>
          <img src={anime.images.jpg.image_url} className="card-img-top" alt={anime.title} />
          <div className="card-body">
            <p className="card-text">{anime.title}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Header;

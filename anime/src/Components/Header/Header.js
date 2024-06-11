import React, { useState } from 'react';
import '../Header/Header.css';

const Header = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState([]);

  const onSearch = async (e) => {
    e.preventDefault();
    const searchText = e.target.value;
    setSearch(searchText);
  };
  const toggleOpen = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
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
            className='search'
            placeholder='Search Anime'
            value={search}
            onChange={onSearch}
            onBlur={handleSearch} // Trigger search when input loses focus
          />
        </div>
      </div>
      <div className='card-body'>

      {searchResults && searchResults.length > 0 && searchResults.map((anime,index) => (
        // console.log(anime)
        <div className="card" key={anime.mal_id
          }>
          <img src={anime.images.jpg.image_url} className="card-img-top" alt={anime.title} />
          <div className="card-body">
          <h5 className="card-title">{anime.title}</h5>
          <p className="card-text" style={isOpen[index] ? null : { WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }}>{anime.synopsis}</p>
          <button className='btn' onClick={() => toggleOpen(index)}>{isOpen[index] ? "Read less" : "Read more"}</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Header;

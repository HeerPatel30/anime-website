import React, { useEffect, useState } from 'react';
import '../Home/Home.css';

const Home = () => {

  const [topAnime, setTopAnime] = useState([]);
  const [isOpen, setIsOpen] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime`);
      const data = await res.json();
      setTopAnime(data.data);

      // Initialize isOpen state for each card to false initially
      setIsOpen(new Array(data.data.length).fill(false));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  useEffect(() => {
    getData();
  }, []);

  const toggleOpen = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  return (
    <div className='Home' >

      <img className="img" src='https://cdn.wallpapersafari.com/89/28/IRa0KM.jpg'></img>
      {topAnime.map((anime, index) => (
        <div key={anime.mal_id} className="card" style={{ width: "200px" }}>
          <img src={anime.images.jpg.image_url} className="card-img-top" alt={anime.title_english}></img>
          <div className="card-body">
            <h5 className="card-title">{anime.title}</h5>
            <p className="card-text" style={isOpen[index] ? null : { WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }}>{anime.synopsis}</p>
            <button className='btn' onClick={() => toggleOpen(index)}>{isOpen[index] ? "Read less" : "Read more"}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

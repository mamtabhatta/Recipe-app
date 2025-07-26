import React, { useState, useEffect } from 'react';
import MealCard from './MealCard';

const Mainpage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [showDefault, setShowDefault] = useState(true);

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const myFunc = async () => {
    if (!search.trim()) {
      setMessage('Please enter something');
      setData([]);
      setShowDefault(false);
    } else {
      const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const jsonData = await get.json();
      if (jsonData.meals) {
        setData(jsonData.meals);
        setMessage('');
      } else {
        setData([]);
        setMessage('No recipes found!');
      }
      setShowDefault(false);
    }
  };

  useEffect(() => {
    const fetchPopular = async () => {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Breakfast');
      const json = await res.json();
      setData(json.meals.slice(0, 20));
    };
    fetchPopular();
  }, []);

  return (
    <>
      <h1 className="head">🍽️ Recipe App</h1>
      <div className="container">
        <div className="searchBar">
          <input type="text" placeholder="Enter Dish" onChange={handleInput} value={search} />
          <button onClick={myFunc}>Search</button>
        </div>
        <h4 className="msg">{message}</h4>
        {data.length > 0 && (
          <>
            {showDefault && <h2 className="recommended-heading">Recommended Recipes</h2>}
            <MealCard detail={data} />
          </>
        )}
      </div>
    </>
  );
};

export default Mainpage;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaClock, FaUtensils, FaFire, FaThermometerHalf } from 'react-icons/fa';
import './App.css';

const RecipeInfo = ({ text, icon }) => {
  return (
    <div className="recipe-info">
      {icon}
      <span>{text}</span>
    </div>
  );
};

RecipeInfo.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
};

const Recipe = ({ data }) => {
  return (
    <div className="recipe-container">
      {data.map((recipe, index) => (
        <div key={index} className="recipe-card">
          <h2>{recipe.name}</h2>
          <img src={recipe.image} alt={recipe.name} className="recipe-image" />
          <RecipeInfo text={`${recipe.time} min`} icon={<FaClock />} />
          <RecipeInfo text={`${recipe.servings} servings`} icon={<FaUtensils />} />
          <RecipeInfo text={`${recipe.calories} calories`} icon={<FaFire />} />
          <RecipeInfo text={`Difficulty: ${recipe.difficulty}`} icon={<FaThermometerHalf />} />
        </div>
      ))}
    </div>
  );
};

Recipe.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  })).isRequired
};

const App = () => {
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    fetch('recipies.json')
      .then(response => response.json())
      .then(data => setRecipesData(data));
  }, []);

  return (
    <div className="app">
      <Recipe data={recipesData} />
    </div>
  );
};

export default App;
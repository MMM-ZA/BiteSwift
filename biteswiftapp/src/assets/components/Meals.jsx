import {useEffect, useState} from 'react';
import MealItem from './MealItem.jsx';

 const Meals = () => {
 const [meals, setMeals] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {

  const fetchMeals = async () => {

     try {
    const response = await fetch('http://localhost:3000/meals');
    const meals = await response.json();

    setMeals(meals)
    setLoading(false)

    } catch (error) {
      console.log('Error fetching meals:', error);
      setLoading(false)

    }

  };

    fetchMeals();

 }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul id='meals'>
        {meals.map((meal => (
          <MealItem key={meal.id} meal={meal}/>
        )))}
      </ul>
    </div>
  );
};

export default Meals;

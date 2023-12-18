import {useEffect, useState} from 'react';

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
      <h2>Meal List</h2>
      <ul id='meals'>
        {meals.map(meal => (
          <li key={meal.id}>{meal.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Meals;

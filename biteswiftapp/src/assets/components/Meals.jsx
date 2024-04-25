import useHttp from '../../hooks/useHttp.js';
import MealItem from './MealItem.jsx';

const requestConfig = {};

 const Meals = () => {
 const {
  data:meals,
   isLoading,
    error,
  } =  useHttp('http://localhost:3000/meals', requestConfig, []);


 if (isLoading) {
  return <p>Fetching Meals...</p>;
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

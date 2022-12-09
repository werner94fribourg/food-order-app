import React from 'react';
import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';

const Meals = props => {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvailableMeals
        meals={props.meals}
        isLoading={props.isLoading}
        httpError={props.httpError}
      />
    </React.Fragment>
  );
};

export default Meals;

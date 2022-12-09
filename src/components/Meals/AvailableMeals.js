import classes from './AvailableMeals.module.scss';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = props => {
  const mealsList = props.meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  if (props.isLoading)
    return (
      <section className={classes['meals-are-loading']}>
        <p>Loading...</p>
      </section>
    );

  if (props.httpError) {
    return (
      <section className={classes['meals-error']}>
        <p>{props.httpError}</p>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

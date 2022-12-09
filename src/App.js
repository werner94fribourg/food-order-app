import React, { useEffect, useState } from 'react';
import useHttp from './hooks/use-http';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [meals, setMeals] = useState([]);
  const processMealsData = data => {
    const dataArray = [];
    for (const [_, values] of Object.entries(data)) {
      dataArray.push(values);
    }
    console.log(dataArray);
    setMeals(() => dataArray.flatMap(data => data));
  };
  const {
    isLoading: mealsAreLoading,
    httpError: mealsError,
    sendRequest: getMeals,
  } = useHttp(processMealsData);

  useEffect(() => {
    getMeals('https://react-http-e214c-default-rtdb.firebaseio.com/meals.json');
  }, []);
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals
          meals={meals}
          isLoading={mealsAreLoading}
          httpError={mealsError}
        />
      </main>
    </CartProvider>
  );
}

export default App;

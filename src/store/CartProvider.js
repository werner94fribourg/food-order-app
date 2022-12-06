import CartContext from './cart-context';
const addItemToCartHandler = item => {};
const removeItemFromCartHandler = id => {};

const CartProvider = props => {
  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

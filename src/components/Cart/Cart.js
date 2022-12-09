import React from 'react';
import { useContext, useState } from 'react';
import useHttp from '../../hooks/use-http';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.scss';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const { isLoading: isSubmitting, sendRequest: submitOrders } = useHttp(
    () => {}
  );
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = userData => {
    submitOrders(
      'https://react-http-e214c-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    ).then(() => {
      setDidSubmit(true);
      cartCtx.clearCart();
    });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(cartItem => (
        <CartItem
          key={cartItem.id}
          item={cartItem}
          name={cartItem.name}
          amount={cartItem.amount}
          price={cartItem.price}
          onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
          onAdd={cartItemAddHandler.bind(null, cartItem)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes['button']} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const didSubmitModalContent = (
    <div className={classes.actions}>
      <p>Successfully sent the order !</p>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  );

  const isSubmittingModalContent = (
    <div className={classes.actions}>
      <p>Sending order data...</p>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

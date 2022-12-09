import { useRef } from 'react';
import classes from './Checkout.module.scss';

const Checkout = props => {
  const nameInput = useRef();
  const streetInput = useRef();
  const postalCodeInput = useRef();
  const cityInput = useRef();

  const confirmHandler = event => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;
    const enteredCity = cityInput.current.value;
  };
  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameInput} />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInput} />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input id="postal" type="text" ref={postalCodeInput} />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInput} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;

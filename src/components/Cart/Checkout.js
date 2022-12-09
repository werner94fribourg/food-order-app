import { useRef, useState } from 'react';
import classes from './Checkout.module.scss';

const isEmpty = value => value.trim() === '';

const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

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

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    // Submit cart data
    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };
  return (
    <form onSubmit={confirmHandler}>
      <div
        className={`${classes.control}${
          formInputsValidity.name ? '' : ` ${classes.invalid}`
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameInput} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control}${
          formInputsValidity.street ? '' : ` ${classes.invalid}`
        }`}
      >
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInput} />
        {!formInputsValidity.street && <p>Please enter a street!</p>}
      </div>
      <div
        className={`${classes.control}${
          formInputsValidity.postalCode ? '' : ` ${classes.invalid}`
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input id="postal" type="text" ref={postalCodeInput} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a postal code (5 characters long)!</p>
        )}
      </div>
      <div
        className={`${classes.control}${
          formInputsValidity.city ? '' : ` ${classes.invalid}`
        }`}
      >
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInput} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
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

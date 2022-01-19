import React, { useRef, useState } from "react";

import classes from "./OrderForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChar = (value) => value.trim().length === 5;

const OrderForm = (props) => {
  const [formFieldsValidity, setFormFieldsValidity] = useState({
    name: true,
    address: true,
    city: true,
    zipcode: true
  });

  const nameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const zipcodeRef = useRef();

  const orderFormSubmitHandler = (e) => {
    e.preventDefault();

    const orderFormInfo = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      zipcode: zipcodeRef.current.value
    };

    const { name, address, city, zipcode } = orderFormInfo;

    const nameIsValid = isNotEmpty(name);
    const addressIsValid = isNotEmpty(address);
    const cityIsValid = isNotEmpty(city);
    const zipcodeIsValid = isFiveChar(zipcode);

    setFormFieldsValidity({
      name: nameIsValid,
      address: addressIsValid,
      city: cityIsValid,
      zipcode: zipcodeIsValid
    });

    const formIsValid =
      nameIsValid && addressIsValid && cityIsValid && zipcodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.submitOrder(orderFormInfo);
  };

  const nameInvalidClass = !formFieldsValidity.name ? classes.invalid : "";
  const addressInvalidClass = !formFieldsValidity.address
    ? classes.invalid
    : "";
  const cityInvalidClass = !formFieldsValidity.city ? classes.invalid : "";
  const zipcodeInvalidClass = !formFieldsValidity.zipcode
    ? classes.invalid
    : "";

  return (
    <form className={classes.form} onSubmit={orderFormSubmitHandler}>
      <div className={classes.formRow}>
        <div className={`${classes.formGroup} ${nameInvalidClass}`}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={nameRef} />
          {!formFieldsValidity.name && <p>The name field cannot be empty.</p>}
        </div>

        <div className={`${classes.formGroup} ${addressInvalidClass}`}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" ref={addressRef} />
          {!formFieldsValidity.address && (
            <p>The address field cannot be empty.</p>
          )}
        </div>
      </div>

      <div className={classes.formRow}>
        <div className={`${classes.formGroup} ${cityInvalidClass}`}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityRef} />
          {!formFieldsValidity.city && <p>The city field cannot be empty.</p>}
        </div>

        <div className={`${classes.formGroup} ${zipcodeInvalidClass}`}>
          <label htmlFor="zipcode">Zip Code</label>
          <input type="text" id="zipcode" ref={zipcodeRef} />
          {!formFieldsValidity.zipcode && (
            <p>Please enter a valid 5 character zipcode.</p>
          )}
        </div>
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.hideCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default OrderForm;

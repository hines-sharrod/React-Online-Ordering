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

    const formIsValid =
      nameIsValid && addressIsValid && cityIsValid && zipcodeIsValid;

    if (!formIsValid) {
      return;
    }

    console.log(name, address, city, zipcode);
  };

  return (
    <form onSubmit={orderFormSubmitHandler}>
      <div className={classes.formGroup}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef} />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressRef} />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="zipcode">Zip Code</label>
        <input type="text" id="zipcode" ref={zipcodeRef} />
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

import React, { useState } from "react";

import classes from "./OrderForm.module.css";

const OrderForm = (props) => {
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" />

      <label htmlFor="address">Address</label>
      <input type="text" id="address" />

      <label htmlFor="city">City</label>
      <input type="text" id="city" />

      <label htmlFor="zipcode">Zip Code</label>
      <input type="text" id="zipcode" />
    </form>
  );
};

export default OrderForm;

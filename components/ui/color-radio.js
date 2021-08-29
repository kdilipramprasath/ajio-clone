import React, { useState } from "react";

import classes from "./color-radio.module.css";

const ColorRadio = ({
  name,
  color,
  value,
  radioSize = "2rem",
  onChange = () => {},
  currentColor,
}) => {
  const onSelectHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <div
      className={classes["custom__radio-button"]}
      style={{ width: radioSize, height: radioSize }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onSelectHandler}
        checked={currentColor === value ? "checked" : ""}
      />
      <div className={classes["radio-button"]}>
        <span
          className={classes["radio-button__inner"]}
          style={{ backgroundColor: color }}
        ></span>
      </div>
    </div>
  );
};

export default ColorRadio;

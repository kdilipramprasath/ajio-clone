import classes from "./size-radio.module.css";

const SizeRadio = ({
  name,
  caption,
  onChange,
  value,
  stockValue,
  currentSize,
}) => {
  const onSelectHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={classes["custom__radio-button"]}>
      <input
        type="radio"
        name={name}
        value={value}
        disabled={stockValue < 1 && "diabled"}
        onChange={onSelectHandler}
        checked={currentSize === value ? "checked" : ""}
      />
      <div className={classes["radio-button"]}>
        <span className={classes["radio-button__caption"]}>{caption}</span>
      </div>
    </div>
  );
};

export default SizeRadio;

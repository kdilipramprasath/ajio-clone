import React, { Fragment } from "react";
import SizeRadio from "../ui/size-radio";

const SelectSize = ({ sizes, stocks, currentSize, onSizeChange }) => {
  return (
    <div className="text-center my-5">
      <div className="mb-3 text-sm text-gray-600">
        {(currentSize === "s" && (
          <div>
            Small{" "}
            <span className="text-gray-400 uppercase">({currentSize})</span>
          </div>
        )) ||
          (currentSize === "m" && (
            <div>
              Medium{" "}
              <span className="text-gray-400 uppercase">({currentSize})</span>
            </div>
          )) ||
          (currentSize === "l" && (
            <div>
              Large{" "}
              <span className="text-gray-400 uppercase">({currentSize})</span>
            </div>
          )) ||
          (currentSize === "xl" && (
            <div>
              Extra Large{" "}
              <span className="text-gray-400 uppercase">({currentSize})</span>
            </div>
          )) ||
          (currentSize === "xxl" && (
            <div>
              Extra Extra Large{" "}
              <span className="text-gray-400 uppercase">({currentSize})</span>
            </div>
          )) || (
            <Fragment>
              Select Size <span className="text-gray-400">(UNI)</span>
            </Fragment>
          )}
      </div>
      <div className="flex justify-center items-center space-x-2">
        {sizes.map((size) => (
          <SizeRadio
            key={size}
            value={size}
            stockValue={stocks[size]}
            name="size"
            caption={size}
            onChange={onSizeChange}
            currentSize={currentSize}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectSize;

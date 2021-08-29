import React, { useState } from "react";
import { createPortal } from "react-dom";

import SizeRadio from "../ui/size-radio";

import { XIcon, PlusIcon, MinusIcon } from "@heroicons/react/solid";

const ChangeSizeModal = ({
  currentSize,
  sizes,
  stocks,
  quantity,
  modalCloseHandler,
  onProductSizeAndQtyUpdate,
}) => {
  const [localSize, setLocalSize] = useState(currentSize);
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const sizeChangeHandler = (size) => {
    setLocalSize(size);
  };

  const updateHandler = () => {
    onProductSizeAndQtyUpdate(localSize, localQuantity);
    modalCloseHandler();
  };

  const increaseQuantity = () => {
    setLocalQuantity((prevState) => prevState + 1);
  };

  const decreaseQuantity = () => {
    setLocalQuantity((prevState) => prevState - 1);
  };

  return createPortal(
    <div className="w-screen h-screen fixed z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center">
      <div
        className="absolute bg-black opacity-40 w-full h-full"
        onClick={modalCloseHandler}
      ></div>
      <div className="relative flex items-center justify-center">
        <div className="bg-white w-80">
          <div className="p-4">
            <div className="font-semibold flex items-center justify-between mb-4">
              <div>Select size</div>{" "}
              <button onClick={modalCloseHandler} className="">
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-2 mb-6">
              {sizes.map((size) => (
                <SizeRadio
                  key={size}
                  actualValue={stocks[size]}
                  value={size}
                  name="size"
                  caption={size}
                  currentSize={localSize}
                  onChange={sizeChangeHandler}
                />
              ))}
            </div>
            <div className="mb-4">Select Quantity</div>
            <div className="flex space-x-4">
              <button onClick={decreaseQuantity}>
                <MinusIcon className="w-4 h-4" />
              </button>
              <div className="border flex items-center justify-center text-gray-600 rounded-full w-9 h-9">
                {localQuantity}
              </div>
              <button onClick={increaseQuantity}>
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={updateHandler}
            className="text-center w-full bg-ajio-yellow text-white py-2 uppercase font-semibold tracking-wide"
          >
            Update
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("overlays")
  );
};

export default ChangeSizeModal;

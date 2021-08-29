import { useState } from "react";

import Image from "next/image";

import { useDispatch } from "react-redux";

import { cartActions } from "../../store/index";

import { toRupees } from "../../utilities/products-utilities";
import ChangeSizeModal from "./change-size-modal";

import { ChevronDownIcon } from "@heroicons/react/solid";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const [showSizeChangeModal, setShowSizeChangeModal] = useState(false);
  const {
    id,
    image,
    brand,
    description,
    size,
    color,
    qty,
    totalReducedPrice,
    totalPrice,
    discount,
    totalDiscount,
    sizes,
    stocks,
  } = props.product;

  const openSizeChangeModal = () => {
    setShowSizeChangeModal(true);
  };

  const closeSizeChangeModal = () => {
    setShowSizeChangeModal(false);
  };

  const onProductDelete = () => {
    dispatch(
      cartActions.deleteProduct({
        productId: id,
        productSize: size,
        productColor: color,
      })
    );
  };

  const onProductSizeAndQtyUpdate = (changeSize, changeQty) => {
    dispatch(
      cartActions.updateProductSizeAndQty({
        productId: id,
        productSize: size,
        productColor: color,
        changeSize,
        changeQty,
      })
    );
  };

  return (
    <div className="flex border box-border w-full text-sm">
      {showSizeChangeModal && (
        <ChangeSizeModal
          sizes={sizes}
          stocks={stocks}
          currentSize={size}
          modalCloseHandler={closeSizeChangeModal}
          onProductSizeAndQtyUpdate={onProductSizeAndQtyUpdate}
          quantity={qty}
        />
      )}
      <div className="bg-gray-500 flex">
        <Image
          src={image}
          width={133.92}
          height={168}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between w-full py-2 px-4 box-border">
        <div className="flex justify-between">
          <div>
            {brand}-{description}
          </div>
          <div className="flex items-center space-x-4 self-start">
            <div className="flex items-center space-x-2">
              <div>Size</div>
              <button
                className="flex items-center uppercase select-none"
                onClick={openSizeChangeModal}
              >
                {size} <ChevronDownIcon className="ml-1 w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div>Qty</div>
              <button
                className="flex items-center uppercase select-none"
                onClick={openSizeChangeModal}
              >
                {qty} <ChevronDownIcon className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-right space-y-3">
            <div className="flex space-x-3 items-end">
              <div>Savings:</div>
              <div className="text-yellow-600 font-semibold tracking-wide text-base">
                {toRupees(totalDiscount)}.00
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="text-yellow-600 tracking-wide font-semibold">
                <span className="line-through">{toRupees(+totalPrice)}.00</span>{" "}
                ({discount}%)
              </div>
              <div className="bg-blue-100 px-4 font-bold text-base self-end border-l-4 border-blue-500">
                {toRupees(+totalReducedPrice)}.00
              </div>
            </div>
          </div>
        </div>
        <div className="flex self-end space-x-14 text-sm">
          <button
            className="text-indigo-700 font-semibold"
            onClick={onProductDelete}
          >
            Delete
          </button>
          <button className="text-indigo-700 font-semibold">
            Move to closet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

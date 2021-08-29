import { ShoppingBagIcon } from "@heroicons/react/solid";

import React, { useState } from "react";

import Link from "next/dist/client/link";

import { useDispatch } from "react-redux";

import { cartActions } from "../../store/index";

import OfferTag from "../ui/offer-tag";
import ShowMoreModal from "../ui/show-more-modal";
import QuickViewCarousal from "./quick-view-carousal";

import { XIcon } from "@heroicons/react/solid";
import SelectSize from "./select-size";
import SelectColor from "./select-color";

const QuickViewProductModal = ({
  closeQuickView,
  discountedPrice,
  oldPrice,
  detailViewPath,
  product,
}) => {
  const dispatch = useDispatch();
  const { _id: id, price, colors, brand, description, discount: offer } = product;
  const firstColor = Object.keys(colors)[0];
  const [currentColor, setCurrentColor] = useState(firstColor);
  const firstImage = colors[currentColor]["images"][0];
  const [showSelectSize, setShowSelectSize] = useState(false);
  const [currentSize, setCurrentSize] = useState();
  const imageUrl = colors[firstColor].images[0];
  const stocks = colors[currentColor].stock;
  const sizes = Object.keys(stocks);

  const onSizeChange = (size) => {
    setCurrentSize(size);
  };

  const onColorChange = (color) => {
    setCurrentColor(color);
  };

  const addToBagHandler = () => {
    if (!currentSize) {
      setShowSelectSize(true);
      return;
    }

    dispatch(
      cartActions.addToBag({
        product: {
          id,
          brand,
          description,
          price: price,
          discount: offer,
          size: currentSize,
          color: currentColor,
          image: firstImage,
          sizes,
          stocks,
        },
      })
    );
    setShowSelectSize(false);
  };
  return (
    <ShowMoreModal width="max-w-screen-xl" closeModalHandler={closeQuickView}>
      {showSelectSize && (
        <div className="py-3 text-center bg-primary text-gray-100 text-sm italic my-3 flex items-center justify-center space-x-4">
          <p>Please select a size</p>{" "}
          <button
            onClick={() => {
              setShowSelectSize(false);
            }}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-center space-x-16 p-8">
        <QuickViewCarousal
          currentColor={currentColor}
          images={colors[currentColor]["images"]}
        />
        {/* ------------------------------------------------------------------------------------------- */}
        <div className="">
          <div className="text-center">
            <h1 className="font-semibold text-lg text-ajio-yellow">{brand}</h1>
            <p>{description}</p>
          </div>
          <div className="w-80 mx-auto text-center">
            <p className="my-4">
              <span className="font-semibold block text-xl">
                {discountedPrice}
              </span>{" "}
              <span className="line-through text-xs">{oldPrice}</span>{" "}
              <span className="font-semibold text-ajio-yellow text-sm">
                ({offer}% off)
              </span>
              <span className="block text-xs text-gray-500">
                Additional GST may apply
              </span>
            </p>

            <div className="space-y-3">
              <OfferTag />
              <div className="text-xs text-blue-500">+3 More</div>
            </div>

            <SelectColor
              colors={colors}
              onColorChange={onColorChange}
              currentColor={currentColor}
            />

            <SelectSize
              sizes={sizes}
              stocks={stocks}
              onSizeChange={onSizeChange}
              currentSize={currentSize}
            />

            <div className="flex flex-col space-y-5">
              <button
                onClick={addToBagHandler}
                style={{ padding: " .5rem 0" }}
                className="relative add-to-cart uppercase tracking-wider box-border text-white flex items-center justify-center bg-ajio-yellow"
              >
                <span className="opacity-0 absolute border border-white inner-border"></span>
                <ShoppingBagIcon className="h-5 w-5 inline-block mr-2" />
                add to bag
              </button>
              <Link href={detailViewPath}>
                <a
                  style={{ padding: " .5rem 0" }}
                  className="product-detail hover:text-white block uppercase font-semibold text-sm  tracking-wider bg-white border-2 border-ajio-yellow text-ajio-yellow py-3"
                >
                  product details
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ShowMoreModal>
  );
};

export default QuickViewProductModal;

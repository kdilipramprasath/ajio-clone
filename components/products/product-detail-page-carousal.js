import React, { Fragment, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/Link";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";

import classes from "./detail-view-carousal.module.css";

const ProductDetailPageCarousal = ({
  currentColor,
  images = [],
  duration = 4000,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[currentImageIndex]);
  const lastImageIndex = images.length - 1;

  const nextImage = () => {
    setCurrentImageIndex((prevState) =>
      prevState !== lastImageIndex ? prevState + 1 : 0
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevState) =>
      prevState === 0 ? lastImageIndex : prevState - 1
    );
  };

  useEffect(() => {
    setCurrentImage(images[currentImageIndex]);
    const imageLoop = setTimeout(() => {
      nextImage();
    }, duration);

    return () => {
      clearTimeout(imageLoop);
    };
  }, [currentImageIndex]);

  const onImageChange = (image) => {
    setCurrentImage(() => image);
  };

  return (
    <Fragment>
      {images.length !== 0 && (
        <Fragment>
          <div className={"" + classes["container"]}>
            <div className="flex flex-col space-y-2 select-none self-center mr-8">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 hover:opacity-50 ${
                    currentImage === image && "opacity-50"
                  }`}
                  style={{ height: "64px", width: "50px" }}
                  onClick={() => onImageChange(image)}
                >
                  <Image
                    src={image}
                    alt={currentColor}
                    width={50}
                    height={64}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {/* ------------------------------------------------------------------------------------------------ */}
            <div onClick={previousImage} className="self-center">
              <ChevronLeftIcon className="w-12 h-12" />
            </div>
            {/* ------------------------------------------------------------------------------------------------ */}
            <div className="flex items-center justify-center">
              <div
                className="relative"
                style={{ height: "591.25px", width: "473px" }}
              >
                {images.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className={`absolute top-0 left-0 transition-opacity duration-500 ${
                        currentImage !== image ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={currentColor}
                        width={473}
                        height={592}
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* ------------------------------------------------------------------------------------------------ */}
            <div onClick={nextImage} className="self-center">
              <ChevronRightIcon className="w-12 h-12" />
            </div>
            {/* ------------------------------------------------------------------------------------------------ */}
            <div className={classes["tabs"]}>
              <div
                className="text-sm relative my-16"
                style={{ width: "473px" }}
              >
                <div className="flex text-gray-300 absolute z-10">
                  <button
                    className={`${
                      showReturns && "border text-black bg-white"
                    } py-1 px-4 border-b-0 font-semibold`}
                    onClick={openReturns}
                  >
                    RETURNS
                  </button>
                  <button
                    className={`${
                      showOurPromise && "border text-black bg-white"
                    } border-gray-300 py-1 px-4 border-b-0 font-semibold`}
                    onClick={openOurPromise}
                  >
                    OUT PROMISE
                  </button>
                </div>
                <div className="absolute top-7 w-full">
                  <div className="box-border p-6 border">
                    {showReturns && (
                      <p>
                        Easy 15 days return and exchange. Return Policies may
                        vary based on products and promotions. For full details
                        on our Returns Policies, please click here․
                      </p>
                    )}
                    {showOurPromise && (
                      <p>
                        We assure the authenticity and quality of our products
                      </p>
                    )}
                  </div>
                  <div
                    className={`absolute z-20 mt-2 right-0 ${classes["service-faq"]}`}
                  >
                    <Link href="/">
                      <a className="text-sm text-blue-600">Service FAQs</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------------------------------------------------------------------------------ */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetailPageCarousal;

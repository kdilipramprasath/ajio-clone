import React, { Fragment, useCallback, useEffect, useState } from "react";

import Image from "next/image";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";

const QuickViewCarousal = ({ currentColor, images = [], duration = 4000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[currentImageIndex]);
  const lastImageIndex = images.length - 1;

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevState) =>
      prevState !== lastImageIndex ? prevState + 1 : 0
    );
  }, [lastImageIndex]);

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
  }, [currentImageIndex, duration, images, nextImage]);

  const onImageChange = (image) => {
    setCurrentImage(() => image);
  };

  return (
    <Fragment>
      {images.length !== 0 && (
        <Fragment>
          <div className="flex items-center space-x-10">
            <div className="flex flex-col space-y-2 select-none">
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

            <div className="flex items-center justify-center">
              <div onClick={previousImage}>
                <ChevronLeftIcon className="w-12 h-12" />
              </div>
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
              <div onClick={nextImage}>
                <ChevronRightIcon className="w-12 h-12" />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default QuickViewCarousal;

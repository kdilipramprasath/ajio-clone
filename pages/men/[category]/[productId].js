import { Fragment, useState } from "react";

import { useDispatch } from "react-redux";

import { cartActions } from "../../../store/index";

import { getDataFromMongoDB } from "../../../utilities/fetch-data";

import { ObjectId } from "mongodb";

import {
  toRupees,
  toReducedPrice,
} from "../../../utilities/products-utilities";
import OfferTag from "../../../components/ui/offer-tag";
import {
  ShoppingBagIcon,
  CollectionIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  XIcon,
} from "@heroicons/react/solid";
import Link from "next/dist/client/link";
import QuickViewCarousal from "../../../components/products/quick-view-carousal";
import SelectSize from "../../../components/products/select-size";
import SelectColor from "../../../components/products/select-color";

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = JSON.parse(props.data)[0];
  // console.log(product["product-details"]["common-details"]);
  // return <div></div>;
  const {
    _id: id,
    colors,
    brand,
    description,
    price,
    discount: offer,
  } = JSON.parse(props.data)[0];
  const firstColor = Object.keys(colors)[0];
  const [currentColor, setCurrentColor] = useState(firstColor);
  const firstImage = colors[currentColor]["images"][0];
  const [currentSize, setCurrentSize] = useState();
  const [showMoreProductDetails, setShowMoreProductDetails] = useState(false);
  const [showSelectSize, setShowSelectSize] = useState(false);

  const stocks = colors[currentColor].stock;
  const sizes = Object.keys(stocks);
  const oldPrice = toRupees(+price);
  const discountedPrice = toRupees(toReducedPrice(+price, offer));

  const productCommonDetails = product["product-details"]["common-details"];
  const productDetails = {
    MRP: (
      <Fragment>
        {oldPrice}.00 inclusive of all taxes{" "}
        <span className="text-gray-400">
          (MRP changes as per size selection)
        </span>
      </Fragment>
    ),
    "Net Qty": "1N",
    "Customer Care Address":
      "AJIO, c/o Reliance Retail Limited, SS Plaza, 74/2 Outer Ring Road, 29th Main Road, BTM 1st Stage, BTM Layout, Bangalore 560068, Karnataka, INDIA. Ph. 1800-889-9991. E-mail - customercare@ajio.com",
    Commodity: <span className="capitalize">{product["sub-category"]}</span>,
  };

  const productSpecificDetails = Object.keys(
    product["product-details"]
  ).filter((key) => Array.isArray(product["product-details"][key]) !== true);
  for (const key of productSpecificDetails) {
    productDetails[key] = product["product-details"][key];
  }

  const [showReturns, setShowReturns] = useState(true);
  const [showOurPromise, setOurPromise] = useState(false);

  const openReturns = () => {
    setShowReturns(true);
    setOurPromise(false);
  };

  const openOurPromise = () => {
    setShowReturns(false);
    setOurPromise(true);
  };

  const onColorChange = (color) => {
    setCurrentColor(color);
  };

  const onSizeChange = (size) => {
    setCurrentSize(size);
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
    <Fragment>
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
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-center items-start space-x-14 my-14">
          <div className="flex flex-col">
            <QuickViewCarousal
              currentColor={currentColor}
              images={colors[currentColor]["images"]}
            />
            <div
              className="text-sm relative my-16 self-end mr-12"
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
                      Easy 15 days return and exchange. Return Policies may vary
                      based on products and promotions. For full details on our
                      Returns Policies, please click here․
                    </p>
                  )}
                  {showOurPromise && (
                    <p>
                      We assure the authenticity and quality of our products
                    </p>
                  )}
                </div>
                <div className={`absolute z-20 mt-2 right-0`}>
                  <Link href="/">
                    <a className="text-sm text-blue-600">Service FAQs</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------------------------------------------- */}
          <div className="">
            <div className="text-center">
              <h1 className="uppercase text-lg text-ajio-yellow">{brand}</h1>
              <p className="text-lg">{description}</p>
            </div>
            <div className="w-80 mx-auto text-center">
              <p className="my-4">
                <span className="block text-xl">{discountedPrice}</span>{" "}
                <span className="line-through text-ajio-yellow text-xs">
                  {oldPrice}
                </span>{" "}
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

              <div className="flex flex-col">
                <button
                  onClick={addToBagHandler}
                  style={{ padding: " .5rem 0" }}
                  className="relative add-to-cart uppercase tracking-wider box-border text-white flex items-center justify-center bg-ajio-yellow"
                >
                  <span className="opacity-0 absolute border border-white inner-border"></span>
                  <ShoppingBagIcon className="h-5 w-5 inline-block mr-2" />
                  add to bag
                </button>
                <div className="uppercase text-xss mt-1 text-gray-500 tracking-wider">
                  handpicked styles | assured quality
                </div>
                <button
                  style={{ padding: " .6rem 0" }}
                  className="product-detail flex justify-center items-center hover:text-white uppercase text-sm tracking-wider bg-white border mt-5 border-ajio-yellow text-ajio-yellow py-3"
                >
                  <CollectionIcon className="h-5 w-5 inline-block mr-2" />
                  save to closet
                </button>
              </div>
              <div className="my-8 text-left text-sm">
                <h2 className="font-semibold tracking-wider text-indigo-800 my-2">
                  Product Details
                </h2>
                <ul className="list-disc space-y-1">
                  {productCommonDetails.map((item, index) => (
                    <li key={item}>{item}</li>
                  ))}

                  <li>
                    <Link href={product["brand-detail"].link}>
                      <a className="text-blue-600">About {brand}</a>
                    </Link>
                  </li>
                  {showMoreProductDetails && (
                    <ul className="list-disc space-y-1">
                      {Object.keys(productDetails).map((key) => (
                        <li key={key}>
                          <div
                            className="grid grid-flow-col gap-3"
                            style={{ gridTemplateColumns: "100px 1fr" }}
                          >
                            <div className="flex justify-between capitalize">
                              {key}
                              <span>:</span>
                            </div>
                            <div>{productDetails[key]}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </ul>
                <button
                  className="text-blue-500 flex my-2"
                  onClick={() =>
                    setShowMoreProductDetails((prevState) => !prevState)
                  }
                >
                  {!showMoreProductDetails ? (
                    <Fragment>
                      Other information{" "}
                      <span>
                        <ChevronDownIcon className="w-5 h-5" />
                      </span>
                    </Fragment>
                  ) : (
                    <Fragment>
                      Less Details{" "}
                      <span>
                        <ChevronUpIcon className="w-5 h-5" />
                      </span>
                    </Fragment>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const productId = context.query.productId;
  const data = await getDataFromMongoDB({ _id: ObjectId(productId) });

  console.log(data);

  return {
    props: {
      data: JSON.stringify(data),
    },
  };
}

export default ProductDetailsPage;

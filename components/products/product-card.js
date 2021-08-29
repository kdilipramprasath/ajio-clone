import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import { Fragment, useState } from "react";

import { toRupees, toReducedPrice } from "../../utilities/products-utilities";
import QuickViewProductModal from "./quick-view-product-modal";

const ProductCard = (props) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const {
    _id: id,
    brand,
    description,
    price,
    discount: offer,
    colors,
  } = props.product;
  const firstColor = Object.keys(colors)[0];
  const imageUrl = colors[firstColor].images[0];
  const detailViewPath = `${props.basePath}/${id}`;

  const openQuickView = () => {
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
  };

  const oldPrice = toRupees(+price);
  const discountedPrice = toRupees(toReducedPrice(+price, offer));

  return (
    <Fragment>
      <div className="w-full group">
        <div className="relative bg-gray-600 box-border">
          <Link href={detailViewPath}>
            <a className="flex">
              <Image
                src={imageUrl}
                alt={description}
                height={590}
                width={473}
              />
            </a>
          </Link>
          <button
            className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full py-2 uppercase font-semibold text-sm tracking-wide"
            style={{ backgroundColor: "rgba(256, 256, 256, .6)" }}
            onClick={openQuickView}
          >
            quick view
          </button>
        </div>
        <Link href={detailViewPath}>
          <a>
            <div className="text-center text-sm px-3">
              <h1 className="font-bold text-xs py-2 text-ajio-yellow uppercase">
                {brand}
              </h1>
              <p className="mb-1">{description}</p>
              <p>
                <span className="font-semibold">{discountedPrice}</span>{" "}
                <span className="line-through text-xs">{oldPrice}</span>{" "}
                <span className="text-xs text-ajio-yellow">({offer}% off)</span>
              </p>
            </div>
          </a>
        </Link>
      </div>
      {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {showQuickView && (
        <QuickViewProductModal
          closeQuickView={closeQuickView}
          product={props.product}
          discountedPrice={discountedPrice}
          oldPrice={oldPrice}
          detailViewPath={detailViewPath}
        />
      )}
    </Fragment>
  );
};

export default ProductCard;

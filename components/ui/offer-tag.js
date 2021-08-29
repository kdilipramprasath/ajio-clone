import { Fragment } from "react";

import Link from "next/dist/client/link";

const OfferTag = () => {
  return (
    <div className="w-72 mx-auto text-xs border border-dashed border-gray-400 p-3 flex justify-center items-center">
      <div className="relative border-r border-gray-400 pr-1 text-ajio-yellow font-semibold">
        Use Code <span className="uppercase">trend555</span>
        <div className="text-blue-500">
          <Link href="/products">T&C</Link>
        </div>
        <div className="absolute w-full" style={{ top: "-1.325rem" }}>
          <div className="inline-block mx-auto bg-white px-2 border border-ajio-yellow">
            Offer
          </div>
        </div>
      </div>
      <div className="pl-3 text-left">
        Get Flat 55% Off on Rs.1690 and Above.
        <div className="text-blue-500">
          <Link href="/products">
            <Fragment>View all products {">"}</Fragment>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferTag;

import { Fragment, useState } from "react";
import Link from "next/link";

import {
  HandIcon,
  BadgeCheckIconm,
  ShoppingBagIcon,
  BadgeCheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";

const Footer = () => {
  const [showAboutAjio, setShowAboutAjio] = useState(false);

  const toggleAboutAjio = () => {
    setShowAboutAjio((prevState) => !prevState);
  };

  return (
    <Fragment>
      <div className="py-8 bg-gray-50">
        <div className="max-w-screen-lg mx-auto">
          <div className="px-6 flex flex-col lg:flex-row space-y-16 lg:space-y-0 justify-between tracking-wider font-semibold uppercase">
            <div className="flex flex-col items-center">
              <div>
                <ShoppingBagIcon className="h-12 w-12 text-primary mb-2" />
              </div>
              <div>Easy Exchange*</div>
            </div>

            <div className="flex flex-col items-center">
              <div>
                <HandIcon className="h-12 w-12 text-primary mb-2" />
              </div>
              <div>100% Handpicked</div>
            </div>

            <div className="flex flex-col items-center">
              <div>
                <BadgeCheckIcon className="h-12 w-12 text-primary mb-2" />
              </div>
              <div>Assured Quality</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary text-gray-300 w-screen py-8 text-sm">
        <div className=" max-w-screen-xl mx-auto px-6 box-border">
          <div>
            <div
              className="flex items-center text-xs mb-6 select-none"
              onClick={toggleAboutAjio}
            >
              More about shopping from AJIO
              {!showAboutAjio && (
                <ChevronDownIcon className="ml-2 h-5 w-5 inline-block" />
              )}
              {showAboutAjio && (
                <ChevronUpIcon className="ml-2 h-5 w-5 inline-block" />
              )}
            </div>
            <div className={`space-y-6 mb-16 ${!showAboutAjio && "hidden"}`}>
              <div>
                <h1 className="text-base font-semibold mb-1">
                  Buy Clothes, Footwear & Fashion Online for Men | AJIO
                </h1>
                <p>
                  Ajio is a one stop online fashion destination brought to you
                  from the house of Reliance. We are the largest fashion outlet
                  in India - having 15000+ stores across 1000+ cities. At Ajio,
                  you can browse & buy a wide variety of carefully handpicked
                  merchandise of highest quality from 500+ premium international
                  brands, exclusive brands & in-house brands at great prices.
                  All of this can be done from the convenience of your home at
                  the click/tap of a button.
                </p>
              </div>
              <div>
                <h1 className="text-base font-semibold mb-1">
                  Buy clothes & footwear for Men Online
                </h1>
                <p>
                  On Ajio, men can find a wide variety of products. Make a style
                  statement with trendy jeans & pair them up with funky T-Shirts
                  & Casual shirts. Head off to a party sporting the latest
                  jackets/hoodies & party-wear shirts. Have an active sports
                  life? We have got you covered with gym wear, track pants,
                  track suits, etc. Having a family reunion? Bring out your
                  trendiest ethnic Kurtas, Sherwanis & Nehru Jackets.
                </p>
              </div>
              <div>
                <h1 className="text-base font-semibold mb-1">
                  Shop from 500+ Top Brands for Men
                </h1>
                <p>
                  In our online store, you can shop for major premium brands
                  like GAS, Superdry, Scotch & Soda, Steve Madden, etc. Men can
                  shop for international brands like Aeropostale, Alcott,
                  Kaporal, Point Zero, etc. Popular brands like Wrangler, Pepe
                  Jeans, US Polo Assn, United Colors of Benetton, Levis, Flying
                  machine, Playboy, Jack & Jones, etc. can be bought from Ajio.
                  Well known Footwear brands like Puma, Woodland, Red Tape,
                  Crocs, etc. can be found on Ajio.
                </p>
              </div>
              <div>
                <h1 className="text-base font-semibold mb-1">
                  Latest collections from Ajio
                </h1>
                <p>
                  Fashion & lifestyle thrives on latest collections & fresh
                  merchandise. Taking cues from fast fashion, we have online
                  collections to suit the current season & trends - like floral
                  prints, summer breeze, minimalists, etc. for Men & Women.
                </p>
              </div>
              <div>
                <h1 className="text-base font-semibold mb-1">
                  Why buy from us?
                </h1>
                <p>
                  Ajio offers the best hand-picked & carefully selected products
                  for the utmost satisfaction of the customers. Our talented
                  in-house design team keeps track of the latest trends in
                  Indian Fashion and Lifestyle & designs products to suit the
                  customer preferences. All our products are Made in India in
                  fast fashion format, i.e. our in-house brands always have the
                  freshest inventory. We offer free shipping & 30-day easy
                  returns all over the country. Didn’t like the product you
                  received? We provide ‘No Questions Asked’ returns & instant
                  refunds.
                </p>
              </div>
            </div>
          </div>

          <div className="select-none grid grid-cols-1 text-center md:text-left md:grid-cols-2 lg:grid-cols-4 border-gray-300 border-b">
            <div className="mb-8">
              <div className="mb-5">
                <Link href="/">Ajio</Link>
              </div>
              <div className="text-xs space-y-2">
                <div>
                  <Link href="/">Who We Are</Link>
                </div>
                <div>
                  <Link href="/">Join Our Team</Link>
                </div>
                <div>
                  <Link href="/">Terms & Conditions</Link>
                </div>
                <div>
                  <Link href="/">We Respect Your Privacy</Link>
                </div>
                <div>
                  <Link href="/">Free & Payments</Link>
                </div>
                <div>
                  <Link href="/">Returns & Refunds Policy</Link>
                </div>
                <div>
                  <Link href="/">Promotions Terms & Conditions</Link>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-5">
                <Link href="/">Help</Link>
              </div>
              <div className="text-xs space-y-2">
                <div>
                  <Link href="/">Track Your Order</Link>
                </div>
                <div>
                  <Link href="/">Frequently Asked Questions</Link>
                </div>
                <div>
                  <Link href="/">Returns</Link>
                </div>
                <div>
                  <Link href="/">Cancellations</Link>
                </div>
                <div>
                  <Link href="/">Payments</Link>
                </div>
                <div>
                  <Link href="/">Customer Care</Link>
                </div>
                <div>
                  <Link href="/">How Do I Redeem My Coupon</Link>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-5">
                <Link href="/">Shop by</Link>
              </div>
              <div className="text-xs space-y-2">
                <div>
                  <Link href="/">Men</Link>
                </div>
                <div>
                  <Link href="/">Women</Link>
                </div>
                <div>
                  <Link href="/">Kids</Link>
                </div>
                <div>
                  <Link href="/">Indie</Link>
                </div>
                <div>
                  <Link href="/">Stores</Link>
                </div>
                <div>
                  <Link href="/">New Arrivals</Link>
                </div>
                <div>
                  <Link href="/">Brand Directory</Link>
                </div>
                <div>
                  <Link href="/">Home</Link>
                </div>
                <div>
                  <Link href="/">Collections</Link>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-5">
                <Link href="/">Follow Us</Link>
              </div>
              <div className="text-xs space-y-2">
                <div>
                  <Link href="/">Facebook</Link>
                </div>
                <div>
                  <Link href="/">Instagram</Link>
                </div>
                <div>
                  <Link href="/">Twitter</Link>
                </div>
                <div>
                  <Link href="/">Pinterest</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 pb-2">
            <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
              <div>
                <div className="mb-4">
                  <Link href="/">Payment methods</Link>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-6">
                  <div>
                    <Link href="/">Net Banking</Link>
                  </div>
                  <div>
                    <Link href="/">VISA</Link>
                  </div>
                  <div>
                    <Link href="/">Mater Card</Link>
                  </div>
                  <div>
                    <Link href="/">Cash on Delivery</Link>
                  </div>
                  <div>
                    <Link href="/">Jio money</Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between md:text-right">
                <div className="mb-4">Secure System</div>
                <div>256-bit SSL Encryption</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;

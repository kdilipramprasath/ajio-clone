import { Fragment } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { useSelector } from "react-redux";

import CartItem from "../../components/cart/cart-item";

import { toRupees } from "../../utilities/products-utilities";

import {
  PlusIcon,
  CurrencyRupeeIcon,
  BadgeCheckIcon,
  ShieldCheckIcon,
  RefreshIcon,
} from "@heroicons/react/solid";

const Cart = () => {
  const products = useSelector((state) => state.products);
  const totalAmount = useSelector((state) => state.totalReducedPrice);
  const totalPrice = useSelector((state) => state.totalPrice);
  const totalDiscountPrice = useSelector((state) => state.totalDiscountPrice);
  const router = useRouter();

  if (products.length < 1) {
    return (
      <Fragment>
        <div className="h-full flex flex-col justify-center space-y-8">
          <div className="my-8 max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-xl tracking-wide font-semibold mb-3 text-gray-600">
                Your Shopping Bag is Empty!
              </h1>
              <p className="text-sm text-gray-500">
                <button className="text-yellow-600">Sign in</button> to link
                items to your account, or view items already in your account.
              </p>
              <div>
                <Link href="/">
                  <a className="uppercase py-4 px-6 tracking-wide text-xs text-white font-semibold bg-yellow-600 inline-block">
                    continue shopping
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="uppercase border-b border-t border-yellow-600">
            <div className="flex justify-center py-8 space-x-10 max-w-screen-xl mx-auto text-yellow-600">
              <div className="flex items-center">
                <ShieldCheckIcon className="w-8 h-8 mr-2" />
                secure payment
              </div>
              <div className="flex items-center">
                <CurrencyRupeeIcon className="w-8 h-8 mr-2" />
                cash on delivery
              </div>
              <div className="flex items-center">
                <BadgeCheckIcon className="w-8 h-8 mr-2" />
                assured quality
              </div>
              <div className="flex items-center">
                <RefreshIcon className="w-8 h-8 mr-2" />
                easy returns
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="my-8 max-w-screen-xl mx-auto">
        <div className="grid grid-flow-col gap-4">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="my-4 text-2xl font-semibold">
                My Bag{" "}
                <span className="text-lg text-gray-400">
                  ({products.length} items)
                </span>
              </h1>
              <Link href={router.route}>
                <div className="text-blue-700 font-semibold text-sm flex items-center space-x-2">
                  <PlusIcon className="w-3 h-3" />
                  <a>Add from closet</a>
                </div>
              </Link>
            </div>
            <div className="max-w-screen-xl mx-auto space-y-5">
              {products.map((product) => {
                return (
                  <CartItem
                    key={`${product.id}-${product.size}-${product.color}`}
                    product={product}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-end my-4">
              <Link href={router.route}>
                <div className="text-blue-700 font-semibold text-sm flex items-center space-x-2">
                  <PlusIcon className="w-3 h-3" />
                  <a>Add from closet</a>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 border box-border">
              <div className="p-4 space-y-4">
                <h1>Order Details</h1>
                <div className="text-sm space-y-3">
                  <div className="flex justify-between">
                    <div>Bag total</div>
                    <div>{toRupees(totalPrice)}.00</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Bag discount</div>
                    <div className="text-yellow-600">
                      -{toRupees(totalDiscountPrice)}.00
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>Delivery</div>
                    <div className="text-yellow-600">Free</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Total Amount</div>
                    <div>{toRupees(totalAmount)}.00</div>
                  </div>
                </div>
              </div>
              <button className="bg-yellow-600 w-full text-white mt-3 p-3 uppercase font-semibold tracking-wide  text-sm">
                proceed to shipping
              </button>
            </div>

            <div className="p-3 border border-gray-500 border-dashed mt-5">
              <div>
                <h1 className="capitalize mt-2 mb-4 font-semibold">
                  Apply Coupon
                </h1>
                <form className="text-sm flex items-center">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="w-full p-3 border focus:border-yellow-600 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-gray-100 p-3 uppercase font-semibold border border-l-0"
                  >
                    Apply
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;

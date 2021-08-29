import { Fragment, useState } from "react";

import Link from "next/dist/client/link";

import SideBar from "../../../../components/side-bar/side-bar";
import ProductCard from "../../../../components/products/product-card";

const Products = (props) => {
  const [showMoreText, setShowMoreText] = useState(false);
  const [isGridThree, setIsGridThree] = useState(true);
  const { products } = props;

  const setThreeGridLayout = () => {
    setIsGridThree(true);
  };

  const setFiveGridLayout = () => {
    setIsGridThree(false);
  };

  const toggleShowMoreText = () => setShowMoreText((prevStat) => !prevStat);

  return (
    <Fragment>
      <div className="max-w-screen-xl mx-auto">
        <div className="text-gray-400 text-xs my-4 tracking-widest"></div>

        <div className="grid" style={{ gridTemplateColumns: "240px 1fr" }}>
          {/* -------------------------------------------------------------------- */}
          <SideBar />
          {/* -------------------------------------------------------------------- */}

          {/* -------------------------------------------------------------------- */}
          <div className="space-y-8 mb-8">
            <div className="px-32 text-sm">
              <h1 className="uppercase text-center space-y-1 mb-2">
                <div>men's</div>
                <div className="text-3xl">jackets & coats</div>
              </h1>
              <p>
                Versatile and sophisticated, AJIO brings to you a wide range of
                coats and jackets for men. Be it printed, embroidered, ripped or
                distressed – we have everything. Browse through cool gilets,
                quilted bombers and winter jackets to keep your fashion game on
                fleek this cold season. Let the bad boy out to play with leather
                jackets or sharpen up your look with traditional men’s coats.
                <span className="block">
                  traditional men’s coats.{" "}
                  <Link href="/products">
                    <a className="text-blue-500">+</a>
                  </Link>
                </span>
              </p>
              {showMoreText && (
                <div>
                  <h1>Styles & Brands in Jackets</h1>
                  <p>
                    Add a light layer over your workout gear with sports
                    jackets, running jackets and hoodies infused with quick-dry
                    technology to keep you warm and dry. Stay snug and stylish
                    with lightweight fleece jackets without adding bulk to your
                    outfit. Bringing the best to our store are exciting brands
                    like Celio, Duke, Puma, and many more.
                    <Link href="/products">
                      <a className="text-blue-500 block">Leather Jackets</a>
                    </Link>
                  </p>
                </div>
              )}
              <div
                onClick={toggleShowMoreText}
                className="cursor-pointer text-blue-500"
              >
                Read {!showMoreText ? <span>More</span> : <span>Less</span>}
              </div>
            </div>
            {/* -------------------------------------------------------------------- */}
            <div className="py-1 border-b-2 border-t-2 border-gray-100">
              <div className="py-3 px-4  bg-gray-100 flex justify-between items-center text-sm">
                <div className="font-semibold text-gray-600 text-xs">
                  4,936 Items Found
                </div>
                <div className="flex items-center space-x-2">
                  <span className="uppercase text-gray-400">Grid</span>
                  <div className="flex">
                    <div
                      onClick={setThreeGridLayout}
                      className={`border border-gray-500 ${
                        isGridThree ? "opacity-100" : "opacity-30"
                      }`}
                      style={{ padding: "2px" }}
                    >
                      <div
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, rgba(156, 163, 175, 1) 80%, white 0)",
                          backgroundSize: "10px",
                          height: "15px",
                          width: "28px",
                        }}
                      ></div>
                    </div>
                    <div
                      onClick={setFiveGridLayout}
                      className={`border border-gray-500 ${
                        isGridThree ? "opacity-30" : "opacity-100"
                      }`}
                      style={{ padding: "2px" }}
                    >
                      <div
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, rgba(156, 163, 175, 1) 80%, white 0)",
                          backgroundSize: "10px",
                          height: "15px",
                          width: "58px",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="uppercase text-gray-400">Sort By</span>
                  <select
                    name="sort-by"
                    className="capitalize focus:outline-none text-xs border border-black font-semibold p-1 ml-2"
                  >
                    <option value="relevence">Relevence</option>
                    <option value="price-low">Price Lowest First</option>
                    <option value="price-high">Price Highest First</option>
                    <option value="new">What's New</option>
                    <option value="discount">Discount</option>
                  </select>
                </div>
              </div>
            </div>
            {/* -------------------------------------------------------------------- */}

            <div
              className={`grid ${
                isGridThree ? "grid-cols-3" : "grid-cols-5"
              } gap-5`}
            >
              {products.map((product) => {
                return (
                  <div key={product.id}>
                    <ProductCard {...product} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const products = [];
  const res = await fetch("http://localhost:3000/products-json/products.json");
  const data = await res.json();
  for (const key in data.products) {
    products.push({ id: key, ...data.products[key] });
  }

  return {
    props: {
      products: products,
    },
  };
}

export default Products;

import { Fragment, useState } from "react";

import { getDataFromMongoDB } from "../../../utilities/fetch-data";

import SideBar from "../../../components/side-bar/side-bar";
import ProductCard from "../../../components/products/product-card";

import { toNormalWord } from "../../../utilities/products-utilities";

const Products = (props) => {
  const [isGridThree, setIsGridThree] = useState(true);
  const { group, category, subCategory, data } = props;
  const products = data && JSON.parse(data);

  const setThreeGridLayout = () => {
    setIsGridThree(true);
  };

  const setFiveGridLayout = () => {
    setIsGridThree(false);
  };

  return (
    <Fragment>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid" style={{ gridTemplateColumns: "240px 1fr" }}>
          {/* -------------------------------------------------------------------- */}
          <SideBar />
          {/* -------------------------------------------------------------------- */}

          {/* -------------------------------------------------------------------- */}
          <div className="space-y-8 m-8">
            <div className="px-32 text-sm">
              <h1 className="uppercase text-center space-y-1 mb-2">
                {group ? (
                  <Fragment>
                    <div>{group + "'s"}</div>
                    <div className="text-3xl">
                      {toNormalWord(subCategory || category)}
                    </div>
                  </Fragment>
                ) : (
                  "Loading..."
                )}
              </h1>
            </div>
            {/* -------------------------------------------------------------------- */}
            <div className="py-1 border-b-2 border-t-2 border-gray-100">
              <div className="py-3 px-4  bg-gray-100 flex justify-between items-center text-sm">
                <div className="font-semibold text-gray-600 text-xs">
                  {products ? products.length + " Items found" : "Loading..."}
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
                    <option value="new">{"What's New"}</option>
                    <option value="discount">Discount</option>
                  </select>
                </div>
              </div>
            </div>
            {/* -------------------------------------------------------------------- */}

            {products && (
              <div
                className={`grid ${
                  isGridThree ? "grid-cols-3" : "grid-cols-5"
                } gap-5`}
              >
                {products.map((product) => {
                  return (
                    <div key={product._id}>
                      <ProductCard
                        product={product}
                        basePath={"/product-details/" + group}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const [group, category, subCategory] = context.params.slug;

  const data = await getDataFromMongoDB({ group, category, subCategory });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      group,
      category,
      subCategory: subCategory || "",
      data: JSON.stringify(data),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: ["men", "western-wear"],
        },
      },
      {
        params: {
          slug: ["men", "western-wear", "shirts"],
        },
      },
      {
        params: {
          slug: ["men", "western-wear", "jackets&coats"],
        },
      },
      {
        params: {
          slug: ["men", "ethnic&festive"],
        },
      },
      {
        params: {
          slug: ["men", "ethnic&festive", "kurtas&shirts"],
        },
      },
      {
        params: {
          slug: ["men", "footwear"],
        },
      },
      {
        params: {
          slug: ["men", "footwear", "casual-shoes"],
        },
      },
      {
        params: {
          slug: ["men", "footwear", "formal-shoes"],
        },
      },
    ],
    fallback: false,
  };
}

export default Products;
